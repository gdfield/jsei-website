import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0001-9662-5352';

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

export const metadata = {
  title: 'Joseph Demer Laboratory',
  description: "The Demer lab studies the neural and structural basis of eye movements, with application to the diagnosis and treatment of strabismus, and the role of e...",
};

export default async function DemerPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joseph Demer",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/demer",
  "description": "The Demer lab studies the neural and structural basis of eye movements, with application to the diagnosis and treatment of strabismus, and the role of eye movements in glaucoma and myopia.",
  "knowsAbout": [
    "Ocular Motility",
    "Strabismus",
    "Visual Neuroscience",
    "Eye Mobility and Rehabilitation"
  ],
  "worksFor": {
    "@type": "CollegeOrUniversity",
    "name": "University of California, Los Angeles",
    "alternateName": "UCLA"
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Navbar />
      <main id="main-content">
      <Hero 
        title="Joseph L. Demer Laboratory"
        subtitle="Ocular Motility and Vision"
        description="Understanding eye movement control and strabismus"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/demer.jpg"
              alt="Dr. Joseph Demer"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Joseph L. Demer, M.D., Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Arthur L. Rosenbaum, MD, Chair in Pediatric Ophthalmology </p>
              <p className="text-gray-600">Departments of Ophthalmology and Neurology</p>
              <p className="text-gray-600">Director, Prototype Construction Core</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <a 
                  href="mailto:jld@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jld@jsei.ucla.edu
                </a>
                <br />
              <a 
                href="https://profiles.ucla.edu/joseph.demer" 
                className="text-blue-600 hover:text-blue-800 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Faculty Profile
              </a>
                <a
                  href={`https://orcid.org/${FACULTY_ORCID}`}
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ORCID Profile
                </a>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              While the extraocular muscles obviously play complex roles in ocular rotation and alignment, extraocular muscle forces must mechanically balance against the eyeball, optic nerve, and a network of suspensory tissues within the orbit. The effects of eye rotation are concentrated at the optic disc and propagate from it into surrounding retina, choroid, and sclera. The optic nerve both contributes to muscle loading, and is in turn loaded by the muscles, potentially contributing to: 1) strabismus, the misalignment of the eyes often associated with double vision; 2) normal tension glaucoma associated with visual loss; and 3) pathologic myopia, the elongation and deformation of the eye causing nearsightedness. The Demer lab studies the dynamic ocular motility contribution to these disorders.
            </p>
            
            <p className="text-gray-800">
              The Demer Lab studies mechanisms of strabismus by detailed clinical measurements of ocular motility in normal volunteers and patients with specific forms of strabismus such as superior oblique palsy and masquerading conditions. Specialized magnetic resonance imaging (MRI) technique quantitatively demonstrates the anatomy and function of the extraocular muscles and associated connective tissues in the eye sockets. Lumped parameter and finite element computational models are used to test hypotheses about mechanisms of strabismus, and to guide precision diagnosis and optimize surgical therapy for strabismus. Analysis of long-term results of standardized strabismus surgeries are used to develop and test quantitative, data-driven recommendations for use by surgeons worldwide. To date, these studies have fundamentally changed the understanding of the anatomy of human muscles and associated connective tissues, elucidating common but heretofore unrecognized causes of common strabismus.
            </p>

            <p className="text-gray-800">
              The Demer lab performs MRI and optical imaging of the human eye during eye movements to measure the resulting deformations of the optic nerve, optic disc, retina, and choroid. Tissue deformations determined from the imaging using machine learning are compared with finite element computational models based on measured biomechanical properties of post-mortem human ocular tissues. Resulting models are then correlated with clinical findings in patients with glaucoma and pathological myopia. These studies suggest that eye movements significantly to both common, blinding disorders, and may eventually improve their treatments.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Publications</h2>
          <div className="space-y-3">
                {publications.map((pub, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
        {pub.authors.length > 0 && (
          <p className="text-gray-700 mb-1">{pub.authors.join(', ')}</p>
        )}
        <p className="text-gray-600">
          {pub.journal}{pub.journal && pub.year ? ` (${pub.year})` : pub.year}
        </p>
        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            className="text-blue-600 hover:text-blue-800 text-sm"
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
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}