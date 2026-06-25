import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0003-2773-8198';

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
  title: 'Gabriel Travis Laboratory',
  description: "Dr. Travis studies the regeneration of opsin visual pigments in rod and cone photoreceptor cells. The genes for several proteins in this enzymatic pathw...",
};

export default async function TravisPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gabriel Travis",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/travis",
  "description": "Dr. Travis studies the regeneration of opsin visual pigments in rod and cone photoreceptor cells. The genes for several proteins in this enzymatic pathway are affected in inherited photoreceptor degenerations causing progressive blindness.",
  "knowsAbout": [
    "Photoreceptor Biochemistry",
    "Visual Pigment",
    "Retinal Degeneration",
    "Retinal Biology"
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
        title="Gabriel Travis Laboratory"
        subtitle="Visual Cycle and Inherited Photoreceptor Degenerations"
        description=""
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/travis.jpg"
              alt="Dr. Gabriel Travis"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Gabriel H. Travis, M.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Charles Kenneth Feldman Chair in Ophthalmology</p>
              <p className="text-gray-600">Department of Ophthalmology and Biological Chemistry</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:travis@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  travis@jsei.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/gabriel.travis" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <a 
                  href="https://www.uclahealth.org/departments/eye/research/research-laboratories/photoreceptor-biochemistry" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory Website
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
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Travis has been working in the field of vision science since 1989, when he identified the gene affected in the spontaneous <em>retinal degeneration slow</em> (<em>rds</em>) mutant mouse as a postdoctoral fellow. This was one of the first genes causing neural degeneration to be identified. Since then, Dr. Travis has been working on several retinal proteins required for visual function in vertebrates. His approach has been to determine what each protein 'does for a living' normally, and to understand how loss of the protein causes pathology in genetically modified mice or zebrafish, and in patients with mutations in its gene. Methodologies commonly used by his group include molecular biology, biochemistry, analysis of visual retinoids, immunocytochemistry of retina sections, and photoreceptor physiology, in collaboration with Sampath at Jules Stein Eye Institute. The project described below represents one of several currently ongoing in Dr. Travis laboratory.
            </p>
            
            <p className="text-gray-800 font-bold">
              Characterization of the alternate visual cycle for regeneration of cone-opsin pigments under daylight conditions.
            </p>

            <p className="text-gray-800">
              Vertebrates, including humans, use <em>bleaching</em> visual pigments that dissociate following photoisomerization to yield free all‑<em>trans‑</em>retinaldehyde (atRAL) and unliganded apo-opsin. Apo-opsins regain light sensitivity by recombining with an 11‑<em>cis‑</em>retinaldehyde (11cRAL) chromophore molecule. Rhodopsin visual pigment in rods has long been known to utilize the canonical visual cycle in retinal pigment epithelial (RPE) cells. This enzyme pathway is active in the dark and keeps up with rhodopsin photoisomerization under dim light. However, the throughput of this pathway <em>much slower</em> than the rate of visual-pigment photoisomerization in a daylight-exposed retina. A second pathway in Müller glial cells has a higher throughput that keeps up with rhodopsin and cone-opsin photoisomerization in bright daylight. Dr. Travis' group showed that this pathway utilizes RDH10, a retinol dehydrogenase in Müller cells that oxidizes all‑<em>trans‑</em>retinol (atROL) to atRAL, and reduces 11cRAL to 11‑<em>cis‑</em>retinol (11cROL). This enzyme works in conjunction with RGR-opsin, a 'reverse' photoisomerase that converts atRAL to 11cRAL upon exposure to light. More recently, his group showed that RDH12 reduces atRAL to atROL, and oxidizes 11cROL to 11cRAL. Importantly, the <em>Rdh12</em> gene is affected in infants and children with the severe blinding disease, Leber Congenital Amaurosis. A cartoon of the alternate visual cycle is shown in Figure 1. Because this pathway is driven by light, its throughput scales with light intensity. The energy of chromophore regeneration comes from sunlight, unlike the canonical visual cycle in RPE cells that requires metabolic energy. While rods can only regenerate photobleached rhodopsin with 11cRAL chromophore, cones can use 11cROL (chromophore precursor) or 11cRAL. The alternate visual cycle in Müller cells releases 11cROL, which is taken up and converted by RDH12 in cones to 11cRAL, which they use to regenerate photobleached cone-opsins (Figure 1). Thus, the alternate visual cycle acts as a 'private pipeline' of chromophore precursor that exclusively regenerates cone visual pigments and helps cones to escape competition from rods for scarce 11cRAL chromophore in a daylight illuminated retina.
            </p>

            <div className="mb-2">
              <img 
                src="/images/research/travis-fig.jpg"
                alt="Figure 1: Proposed model for the photic cone visual-cycle in Müller glial cells and cone photoreceptors"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="bg-gray-100 p-4 mt-2 rounded-lg text-sm">
                <p className="text-gray-800">
                  <strong>Figure 1. Proposed model for the photic cone visual-cycle in Müller glial cells and cone photoreceptors.</strong> Absorption of a photon (<em>hv</em>) by a cone-opsin pigment isomerizes the 11cRAL to atRAL, activating visual transduction. Shortly afterwards, atRAL dissociates from the opsin, is reduced to atROL by ZCRDH and is released into the extracellular space for recycling. The atROL is taken up by the Müller cell where it is re-oxidized by RDH10 to atRAL, which binds covalently to apo-RGR opsin. Absorption of a photon by RGR opsin isomerizes atRAL to 11cRAL. The 11cRAL is reduced, again by RDH10, to 11cROL, which is released by Müller cells into the extracellular space. Finally, the 11cROL is taken up by the cone photoreceptor where it is oxidized by RDH12 to 11cRAL, which combines with cone apo-opsin to form a new cone visual pigment. Since only cones can utilize 11cROL to regenerate their visual pigments, the visual cycle in Müller cells helps cones avoid competition with rods for chromophore under bright-light conditions.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Publications Section */}
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

      {/* Footer */}
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