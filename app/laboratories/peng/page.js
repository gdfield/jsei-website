import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-5689-2779';

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

export const metadata = pageMeta({
  path: '/laboratories/peng',
  title: "Yi-Rong Peng Laboratory",
  description: "Dr. Peng uses multi-omics and bioinformatics to study how the visual system forms and degenerates, and the genetic basis of neural circuit development.",
  image: "/images/faculty/peng.jpg",
  imageAlt: "Dr. Yi-Rong Peng",
});

export default async function PengPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yi-Rong Peng",
  "jobTitle": "Assistant Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/peng",
  "description": "Dr. Peng investigates the cellular and molecular mechanisms that underlie the formation and degeneration of the visual system, using multi-omics and bioinformatics tools to uncover the genetic basis of neural circuit development.",
  "knowsAbout": [
    "Visual System Development",
    "Retinal Degeneration",
    "Multi-omics",
    "Bioinformatics"
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
        title="Yi-Rong Peng Laboratory"
        subtitle="Retinal Transcriptomics and Vision Research"
        description="Decoding the molecular mechanisms underlying retinal development, cell-type specificity, and disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/peng.jpg"
          alt="Dr. Yi-Rong Peng"
          name="Yi-Rong Peng, Ph.D."
          titles={[
            "Assistant Professor",
            "Departments of Ophthalmology and Neurobiology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:yirongpeng@mednet.ucla.edu", label: "yirongpeng@mednet.ucla.edu" },
            { kind: "lab", href: "https://yirongpeng.com", label: "Laboratory website" },
            { kind: "profile", href: "https://profiles.ucla.edu/yirong.peng", label: "Faculty profile" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
  <p className="text-ink-soft">
    Cells are the building blocks of complex biological systems, exhibiting remarkable diversity in the visual system. Understanding how cell types form, connect, and degenerate is fundamental to uncover the mechanisms behind blinding diseases. The Peng lab leverages multi-omics approaches–genomics, transcriptomics, and proteomics–to decode genetic programs that define cell-type features, unravel the molecular basis of specialized human vision, and identify key signatures driving degeneration in ocular diseases.
  </p>
  
  <div className="mt-4">
    <h3 className="text-xl font-bold text-ink mb-3">Research Focus Areas:</h3>
    <ul className="list-decimal pl-5 space-y-2 text-ink-soft">
      <li>Genetic Regulations of Cell Type Generation and Differentiation</li>
      <li>Molecular Mechanisms of Circuit Formation and Specialization</li>
      <li>Cellular and Synaptic Adaptations During Retinal Degeneration</li>
      <li>Cellular and Circuit Principles of the Aging process in the Visual System</li>
    </ul>
  </div>
  
  <p className="text-ink-soft mt-4">
    The ultimate goal of our research is to provide a fundamental understanding of circuit formation and degeneration in the visual system and to develop therapeutic strategies to prevent or treat vision loss.
  </p>
        </LabProfile>

        <LabTrainees lab="peng" />

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
