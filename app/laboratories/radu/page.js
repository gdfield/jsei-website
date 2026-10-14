import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-5064-6403';

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
  title: 'Roxana A. Radu Laboratory',
  description: "Dr. Radu's research investigates retinal degenerative diseases by exploring the retinal pigment epithelium (RPE) using genetic, biochemical, and cell bi...",
};

export default async function RaduPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Roxana A. Radu",
  "jobTitle": "Associate Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/radu",
  "description": "Dr. Radu's research investigates retinal degenerative diseases by exploring the retinal pigment epithelium (RPE) using genetic, biochemical, and cell biological approaches.",
  "knowsAbout": [
    "Retinal Degeneration",
    "Retinal Pigment Epithelium",
    "Biochemistry",
    "Disease Modeling"
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
          src="/images/laboratory-banners/radu.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 10%' }}
        />
        <div className="absolute inset-0 bg-ink/60 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-2 text-white">Roxana A. Radu Laboratory</h1>
          <h2 className="text-xl md:text-4xl font-semibold text-center mb-2 text-white">Retina Biochemistry and Disease Modeling</h2>
          <p className="text-lg md:text-xl text-center">Understanding and treatment of retinal diseases through research on retinoid metabolism and pigment epithelium biology</p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/radu.jpg"
              alt="Dr. Roxana A. Radu"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h2 className="text-xl font-bold text-ink">Roxana A. Radu, M.D.</h2>
              <p className="text-muted">Associate Professor</p>
              <p className="text-muted">Vernon O. Underwood Family Chair in Ophthalmology </p>
              <p className="text-muted">Department of Ophthalmology</p>
              <p className="text-muted">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:radu@jsei.ucla.edu" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  radu@jsei.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/roxana.radu" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <a
                  href="https://www.uclahealth.org/departments/eye/research/research-laboratories/retina-biochemistry-clinical-disease-modeling-laboratory"
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory Website
                </a>
                <a 
                  href="https://www.ncbi.nlm.nih.gov/myncbi/roxana.radu.1/bibliography/public/" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publications
                </a>
                <a 
                  href="https://scholar.google.com/citations?user=msOSAGEAAAAJ&hl=en" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Scholar
                </a>
                <a
                  href={`https://orcid.org/${FACULTY_ORCID}`}
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ORCID Profile
                </a>



                </div>
                </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-ink-soft">
            Dr. Radu leads a cutting-edge research program focused on understanding and treating degenerative macular diseases, specifically Stargardt disease (STGD1) and age-dependent macular degeneration (AMD). Dr. Radu’s group has made significant breakthroughs in understanding complex eye diseases. Key discoveries include identifying the ABCA4 gene’s expression in RPE cells, developing innovative "disease-in-a-dish" models using induced pluripotent stem cells, and revealing complement system dysregulation as a common pathological pathway in both STGD1 and AMD. The laboratory is pioneering new approaches by examining retinoid-lipid processing, mitochondrial function, and cellular interactions to identify molecular targets for potential therapeutic interventions.             </p>
            <div>
              <h3 className="text-lg font-semibold text-ink mb-3">Key Scientific Questions</h3>
              <ul className="space-y-2 text-ink-soft list-disc list-outside ml-4">
                <li>What are the distinct, cell-type-specific roles of ABCA4 in photoreceptors versus RPE, and how does their loss synergize to drive STGD1 pathology?</li>
                <li>How does dysregulated vitamin A-lipid metabolism contribute to retinoid-lipid buildup and metabolic impairment in STGD1 RPE cells?</li>
                <li>How does loss of ABCA4 impair phosphatidylethanolamine-dependent LC3-associated phagocytosis (LAP) and endolysosomal function, leading to toxic bisretinoid and lipid accumulation in RPE?</li>
                <li>Which lipid-sensitive signaling cascades link lipid droplet accumulation to complement and inflammatory activation, and how can these pathways be targeted therapeutically?</li>
                <li>Can human iPSC-derived RPE–retinal organoid co-culture systems recapitulate ABCA4 genotype-specific disease phenotypes and serve as platforms to identify and validate therapeutic targets?</li>
              </ul>
            </div>
               </div>
        </div>

        <LabTrainees lab="radu" />

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
