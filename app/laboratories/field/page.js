import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const FIELD_ORCID = '0000-0001-5942-2679';

async function fetchRecentPublications(orcid, limit = 10) {
  try {
    const summaryRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!summaryRes.ok) return [];
    const summaryData = await summaryRes.json();

    // Fetch more candidates than needed to ensure enough remain after preprint filtering
    const sorted = (summaryData.group || [])
      .map((g) => ({
        putCode: g['work-summary'][0]['put-code'],
        year: parseInt(g['work-summary'][0]['publication-date']?.year?.value ?? '0'),
        month: parseInt(g['work-summary'][0]['publication-date']?.month?.value ?? '0'),
      }))
      .sort((a, b) => b.year - a.year || b.month - a.month)
      .slice(0, limit * 2 + 5);

    if (sorted.length === 0) return [];

    const putCodes = sorted.map((s) => s.putCode);
    const fullRes = await fetch(
      `https://pub.orcid.org/v3.0/${orcid}/works/${putCodes.join(',')}`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 86400 } }
    );
    if (!fullRes.ok) return [];
    const fullData = await fullRes.json();

    const pubs = (fullData.bulk || [])
      .map((item) => {
        const work = item.work;
        const authors = (work?.contributors?.contributor || [])
          .filter((c) => { const role = c['contributor-attributes']?.['contributor-role']; return !role || role === 'author'; })
          .map((c) => c['credit-name']?.value)
          .filter(Boolean);
        const doiEntry = (work?.['external-ids']?.['external-id'] || [])
          .find((id) => id['external-id-type'] === 'doi');
        return {
          title: work?.title?.title?.value ?? '',
          journal: work?.['journal-title']?.value ?? '',
          year: work?.['publication-date']?.year?.value ?? '',
          doi: doiEntry?.['external-id-value'] ?? null,
          authors,
        };
      })
      .filter((p) => {
        if (!p.title) return false;
        const journal = p.journal.toLowerCase();
        if (journal.includes('biorxiv') || journal.includes('arxiv')) return false;
        // bioRxiv DOIs start with 10.1101/, arXiv with 10.48550/
        if (p.doi && /^10\.(1101|48550)\//.test(p.doi)) return false;
        return true;
      })
      .sort((a, b) => (b.year || '0').localeCompare(a.year || '0'))
      .slice(0, limit);

    await Promise.all(
      pubs
        .filter((p) => (!p.journal || p.authors.length === 0) && p.doi)
        .map(async (p) => {
          try {
            const r = await fetch(`https://api.crossref.org/works/${encodeURIComponent(p.doi)}`, {
              headers: { 'User-Agent': 'JSEI-Website/1.0 (mailto:gregfield@ucla.edu)' },
              next: { revalidate: 86400 },
            });
            if (!r.ok) return;
            const data = await r.json();
            const msg = data?.message;
            if (!p.journal) {
              const containerTitle = msg?.['container-title']?.[0];
              if (containerTitle) p.journal = containerTitle;
            }
            if (p.authors.length === 0 && msg?.author) {
              p.authors = msg.author
                .map((a) => [a.given, a.family].filter(Boolean).join(' '))
                .filter(Boolean);
            }
          } catch {}
        })
    );

    return pubs;
  } catch {
    return [];
  }
}

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = {
  title: 'Greg D. Field Laboratory',
  description: "Dr. Field's laboratory investigates neural circuits in the retina that process visual information, combining electrophysiology, imaging, and computation...",
};

export default async function FieldPage() {
  const publications = await fetchRecentPublications(FIELD_ORCID, 10);

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Greg D. Field",
  "jobTitle": "Associate Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/field",
  "description": "Dr. Field's laboratory investigates neural circuits in the retina that process visual information, combining electrophysiology, imaging, and computational approaches to decode the neural basis of vision at the cellular level.",
  "knowsAbout": [
    "Retinal Circuits",
    "Visual Neuroscience",
    "Electrophysiology",
    "Computational Neuroscience"
  ],
  "worksFor": {
    "@type": "CollegeOrUniversity",
    "name": "University of California, Los Angeles",
    "alternateName": "UCLA"
  }
};

  return (
    <div className="min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Navbar />
      <main id="main-content">
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/field.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 60%' }}
        />
        <div className="absolute inset-0 bg-ink/60 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2 text-white">Greg D. Field Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2 text-white">Visual Processing and Retinal Circuits</h2>
          <p className="text-lg md:text-4xl text-center">Understanding neural computation in the retina</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/field.jpg"
          alt="Dr. Greg D. Field"
          name="Greg D. Field, Ph.D."
          titles={[
            "Associate Professor",
            "Fran and Ray Stark Chair of Ophthalmology",
            "Department of Ophthalmology",
            "Assistant Director of Research",
            "Director, Live Imaging and Functional Evaluation Core",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:gregfield@ucla.edu", label: "gregfield@ucla.edu" },
            { kind: "lab", href: "http://www.retinalcircuits.com", label: "Laboratory website" },
            { kind: "pubs", href: "https://www.ncbi.nlm.nih.gov/myncbi/gregory.field.1/bibliography/public/", label: "Publications" },
            { kind: "profile", href: "https://profiles.ucla.edu/greg.field", label: "Faculty profile" },
            { kind: "orcid", href: `https://orcid.org/${FIELD_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
              The Field laboratory investigates how neural circuits in the retina process visual information and adapt to different environmental conditions. Our research combines electrophysiology, imaging, and computational approaches to understand the fundamental principles of retinal computation.
            </p>

            <div className="space-y-3">
              <p className="text-ink font-semibold">Research Focus Areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>Neural circuits for motion processing</li>
                <li>Adaptation to different light levels</li>
                <li>Parallel processing in retinal pathways</li>
                <li>Computational models of retinal function</li>
                <li>Visual signal processing and encoding</li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Our research aims to understand how the retina performs complex computations and adapts to changing environmental conditions. This work provides insights into both fundamental principles of neural computation and potential therapeutic strategies for vision restoration.
            </p>
        </LabProfile>

        <LabTrainees lab="field" />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink mb-4">Recent Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={index} className="rounded-xl border border-mist bg-surface p-4 shadow-card transition-shadow hover:shadow-lift">
                <h3 className="text-lg font-bold text-ink mb-2">{pub.title}</h3>
                {pub.authors.length > 0 && (
                  <p className="text-ink-soft mb-1">{pub.authors.join(', ')}</p>
                )}
                <p className="text-muted">
                  {pub.journal}{pub.journal && pub.year ? ` (${pub.year})` : pub.year}
                </p>
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    className="text-sea hover:text-gold-deep text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Publication
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      </main>
      <Footer />
    </div>
  );
}
