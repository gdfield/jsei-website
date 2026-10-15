import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0001-7532-9191';

async function fetchRecentPublications(orcid, limit = 10) {
  try {
    const summaryRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!summaryRes.ok) return [];
    const summaryData = await summaryRes.json();

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
  title: 'Edmund Tsui Laboratory',
  description: "Dr. Edmund Tsui specializes in ocular inflammatory diseases including uveitis, leading research on advanced imaging analysis and biomarker discovery as ...",
};

export default async function TsuiEdmundPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Edmund Tsui",
  "jobTitle": "Associate Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/tsui-e",
  "description": "Dr. Edmund Tsui specializes in ocular inflammatory diseases including uveitis, leading research on advanced imaging analysis and biomarker discovery as well as clinical trials for innovative uveitis therapies.",
  "knowsAbout": [
    "Uveitis",
    "Ocular Inflammation",
    "Ocular Imaging",
    "Clinical Trials"
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
      <LabBanner
        image="/images/laboratory-banners/williams.jpg"
        position="center 20%"
        title="Edmund Tsui Laboratory"
        subtitle="Uveitis and Ocular Inflammatory Diseases"
        description="Advancing the diagnosis and treatment of uveitis through cutting-edge imaging technologies and clinical trials"
      />

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/tsui-e.jpg"
          alt="Dr. Edmund Tsui"
          name="Edmund Tsui, M.D., M.S."
          titles={[
            "Associate Professor",
            "Department of Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:etsui@mednet.ucla.edu", label: "etsui@mednet.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/edmund.tsui", label: "Faculty profile" },
            { kind: "web", href: "https://x.com/EdmundTsuiMD", label: "X (Twitter)" },
            { kind: "web", href: "https://www.linkedin.com/in/edmundtsui/", label: "LinkedIn" },
            { kind: "pubs", href: "https://pubmed.ncbi.nlm.nih.gov/?term=edmund+tsui&sort=date", label: "Publications" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
            The Tsui Research Group is committed to advancing the field of uveitis through innovative imaging analysis, improved diagnostic tools, and clinical trials. By leveraging advanced imaging modalities such as optical coherence tomography, we aim to quantify objectively intraocular inflammation and enhance diagnostic accuracy in uveitis. Our work also includes developing standardized methodologies for assessing inflammation, and conducting clinical trials to evaluate novel therapeutics in the treatment of uveitis and ocular inflammatory disease. 
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Our research focuses on these areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>Image Analysis: Develop and validate imaging biomarkers using optical coherence tomography (OCT) and other advanced imaging modalities to quantify intraocular inflammation and monitor disease activity in uveitis. This work aims to improve the objectivity of diagnostic assessments, enhance disease monitoring, and guide treatment decisions by leveraging cutting-edge imaging technologies.</li>
                <li>Advanced Diagnostics: Utilize ocular fluid sampling techniques, such as aqueous and vitreous humor analysis, to improve the diagnosis of uveitis. This includes cytokine profiling, pathogen detection, and biomarker discovery to enable precision diagnostics and uncover underlying etiologies of ocular inflammation.</li>
                <li>Clinical Trials: Design and conduct clinical trials to evaluate novel therapies and refine treatment strategies for uveitis and other ocular inflammatory diseases. Our research encompasses immune-modulating therapies, biologics, small molecules, and targeted immunotherapies aimed at reducing inflammation, preventing vision loss, and improving patient outcomes.</li>
              </ul>
            </div>

            <p className="text-ink-soft">
            These research areas reflect our group’s mission to advance the understanding, diagnosis, and treatment of uveitis and ocular inflammatory diseases through innovation and collaboration.
            </p>
        </LabProfile>

        <LabTrainees lab="tsui-e" />

        {/* Publications Section */}
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

      {/* Footer */}
      </main>
      <Footer />
    </div>
  );
}
