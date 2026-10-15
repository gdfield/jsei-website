import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0001-6524-6800';

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
  path: '/laboratories/zhang',
  title: "Jie J. Zheng Laboratory",
  description: "Dr. Zheng's lab combines chemical, cell, and computational biology with drug discovery to develop new treatments for glaucoma and retinal diseases.",
  image: "/images/faculty/zhang.jpg",
  imageAlt: "Dr. Jie Zhang",
});

export default async function ZhangPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

 
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jie J. Zheng",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/zhang",
  "description": "Dr. Zheng's laboratory combines chemical biology, computational biology, and drug discovery to develop innovative therapies for ophthalmic diseases including glaucoma, retinal diseases, and corneal disorders.",
  "knowsAbout": [
    "Drug Discovery",
    "Chemical Biology",
    "AI",
    "Glaucoma",
    "Retinal Biology"
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
       image="/images/laboratory-banners/field.jpg"
       position="center 60%"
       title="Jie J. Zhang Laboratory"
       subtitle="Therapeutic Development and AI-Powered Analysis in Vision Research"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <LabProfile
         photo="/images/faculty/zhang.jpg"
         alt="Dr. Jie Zhang"
         name="Jie J. Zhang, Ph.D."
         titles={[
           "Professor",
           "Department of Ophthalmology",
           "Jules Stein Eye Institute",
         ]}
         links={[
           { kind: "email", href: "mailto:jzheng@jsei.ucla.edu", label: "jzheng@jsei.ucla.edu" },
           { kind: "profile", href: "https://profiles.ucla.edu/jie.zheng", label: "Faculty profile" },
           { kind: "lab", href: "https://www.uclahealth.org/departments/eye/research/research-laboratories/therapeutic-development-ophthalmology", label: "Laboratory website" },
           { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
         ]}
       >
           <p className="text-ink-soft">
           Glaucoma and intraocular pressure (IOP).  Trabecular meshwork (TM) cells play a pivotal role in maintaining TM structure and regulating aqueous humor outflow. When TM cell function is compromised, structural disruptions lead to increased IOP, the primary risk factor for both primary open-angle glaucoma and steroid-induced glaucoma. Despite its significance, there remains a critical unmet need for effective, clinically viable therapies that target TM dysfunction. Their research focuses on developing transformative approaches to restore TM integrity, enhance aqueous humor drainage, and achieve sustained IOP reduction.
           </p>
           
           <p className="text-ink-soft">
           Wnt Signaling and Retinal Neovascularization Diseases. Proliferative retinal neovascularization is a defining feature of several major retinal diseases, including diabetic retinopathy (DR) and retinopathy of prematurity (ROP). Wnt signaling plays a pivotal role in retinal vascular development, with Dishevelled (Dvl) acting as a key regulator of neovascularization, as demonstrated in the oxygen-induced retinopathy (OIR) mouse model. His laboratory has developed a series of small-molecule Wnt inhibitors that selectively target the Dvl PDZ domain, effectively blocking oxidative stress-induced neovascularization in human retinal vascular endothelial cells. These compounds provide a robust platform for further optimization and preclinical development, offering a promising therapeutic strategy for retinal neovascularization disorders.
           </p>

           <p className="text-ink-soft">
           Small-Molecule Wnt Mimics for Corneal Limbal Stem Cell Regulation. Transplantation of cultured autologous limbal stem cells (LSCs) has revolutionized the treatment of limbal stem cell deficiency (LSCD), a leading cause of vision loss and blindness in corneal disorders, including aniridia. To enhance this approach, they have developed novel small-molecule Wnt mimics that activate Wnt signaling and strengthen the progenitor characteristics of LSCs. Since maintaining stem cell properties during expansion is crucial for successful ocular surface reconstruction, these small molecules hold significant promise for LSCD therapy and the development of new treatments for other corneal epithelial disorders.
           </p>

           <p className="text-ink-soft">
           Inherited Retinal Dystrophies and Protein Interaction Network Analysis. Most inherited retinal dystrophies (IRDs) are monogenic disorders in which mutations in different causal genes lead to similar clinical manifestations. They hypothesize that the causal genes of a given IRD must be interconnected at the molecular level to drive the shared disease phenotype. To explore this, they developed an algorithm to integrate and analyze these causal genes within a protein interaction network. By dissecting the resulting network, they aim to uncover the underlying molecular mechanisms of IRDs, shedding light on disease pathogenesis and potential therapeutic targets.
           </p>
       </LabProfile>

       <LabTrainees lab="zhang" />

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