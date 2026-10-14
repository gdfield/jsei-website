import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-0499-3877';

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
  title: 'Sophie Deng Laboratory',
  description: "Dr. Deng's research focuses on corneal stem cell biology and regenerative medicine, developing novel diagnostic and therapeutic strategies for corneal d...",
};

export default async function DengPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

 
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sophie Deng",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/deng",
  "description": "Dr. Deng's research focuses on corneal stem cell biology and regenerative medicine, developing novel diagnostic and therapeutic strategies for corneal diseases.",
  "knowsAbout": [
    "Cornea",
    "Stem Cell Biology",
    "Regenerative Medicine",
    "Eye Surface and Lens"
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
     <Hero 
       title="Sophie Deng Laboratory"
       subtitle="Cornea"
       description=""
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/deng.jpg"
             alt="Dr. Sophie Deng"
             className="w-full rounded-lg shadow-lg"
           />
<div className="mt-4 space-y-2">
  <h2 className="text-xl font-bold text-ink">Sophie X. Deng, M.D., Ph.D.</h2>
  <p className="text-muted">Professor</p>
  <p className="text-muted">Walton Li Chair in Cornea and Uveitis</p>
  <p className="text-muted">Co-Chief, Cornea Division</p>
  <p className="text-muted">Vice Chair for Inspiring Excellence</p>
  <p className="text-muted">Department of Ophthalmology</p>
  <p className="text-muted">Jules Stein Eye Institute</p>
  <div className="flex flex-col space-y-2">
  <a 
                  href="https://profiles.ucla.edu/sophie.deng" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>

                <a 
                  href="https://www.uclahealth.org/departments/eye/research/research-laboratories/cornea-biology" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory Website
                </a>
                <a 
                  href="https://www.ncbi.nlm.nih.gov/myncbi/sophie.deng.1/bibliography/public/" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publications
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

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-ink-soft">
           The Cornea Biology Laboratory, under Dr. Deng's direction, studies the limbal epithelial stem cells (LSCs) and their microenvironment to elucidate the mechanisms by which these cells and the niche factors aid in the regeneration of the corneal surface in patients suffering from limbal stem cell deficiency (LSCD). The role of signaling pathways such as Wnt and Notch in the regulation of LSCs and modulation of these signaling pathways in vitro and in vivo through small molecules is under investigation. 
                      </p>
           
                      <p className="text-ink-soft">
                      Two clinical studies aimed to characterize the cellular changes in the cornea and limbus leading to LSCD and to study the safety and efficacy of LSC transplantation are ongoing. The first study aims to evaluate and validate in vivo parameters using multimodal imaging such as anterior segment optical coherence tomography (AS-OCT) and in vivo confocal microscopy (IVCM) to diagnose and stage LSCD and to assess LSCD treatment outcome. The second clinical study is a Phase I clinical trial to assess the safety, feasibility and efficacy of autologous cultivated LSC therapy in patients suffering from severe or total LSCD (<a href="https://classic.clinicaltrials.gov/ct2/show/NCT03957954" className="text-sea hover:text-gold-deep" target="_blank" rel="noopener noreferrer">more info here</a>).
                                            </p>


           <p className="text-ink-soft">
           Another research project focused on the stromal cell layer of the cornea aims to treat corneal stromal scars with extracellular vesicles (EVs) derived from corneal stromal stem cells (CSSCs), which are multipotent mesenchymal stem cells that regenerate normal corneal stroma and significantly reduce corneal scarring by mediating anti-inflammatory and anti-fibrosis processes. The specific content (cargo) of the EVs and mechanism of action is also under investigation. Pre-clinical research is ongoing to develop an EV-based therapy that could be directly applied to the eye to reduce corneal stromal scarring and improve vision.
                      </p>
         </div>
       </div>

       <LabTrainees lab="deng" />

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