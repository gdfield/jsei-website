import React from 'react';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0002-0785-9577';

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
  title: 'Alapakkam Sampath Laboratory',
  description: "Dr. Sampath's laboratory focuses on understanding how rod and cone photoreceptors and their retinal circuits encode visual information, studying mechani...",
};

export default async function SampathPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alapakkam Sampath",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/sampath",
  "description": "Dr. Sampath's laboratory focuses on understanding how rod and cone photoreceptors and their retinal circuits encode visual information, studying mechanisms of signal detection and light adaptation using advanced electrophysiology.",
  "knowsAbout": [
    "Phototransduction",
    "Synaptic Transmission",
    "Retinal Biology",
    "Visual Neuroscience"
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
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/sampath.jpg"
          alt="Sampath Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">Alapakkam Sampath Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Phototransduction and Synaptic Transmission</h2>
          <p className="text-lg md:text-4xl text-center">Understanding visual processing in the retina</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/sampath.jpg"
              alt="Dr. Alapakkam Sampath"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Alapakkam Sampath, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Grace and Walter Lantz Endowed Chair in Ophthalmology</p>
              <p className="text-gray-600">Departments of Ophthalmology and Neurobiology</p>
              <p className="text-gray-600">Associate Director of Research</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:asampath@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  asampath@jsei.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/alapakkam.sampath" 
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
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              The goal of the Sampath laboratory is the elucidation of fundamental mechanisms of visual processing. 
              We have focused on generating a deeper understanding of development and signaling between photoreceptor 
              cells—the rods and cones—and their synaptic partners, the bipolar cells, to determine how information 
              is formed and processed within retinal circuits.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Our research focuses on the following questions:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  How can rod photoresponses in the mammalian retina provide such an enormous range of rod 
                  vision - from single-photon responses in few rods to light bright enough to activate thousands 
                  or tens of thousands of rhodopsin pigment molecules per second?
                </li>
                <li>
                  How do the many mechanisms of pigment regeneration influence photoreceptor and circuit-level 
                  sensitivity in steady light?
                </li>
                <li>
                  What are the molecules that determine the specificity of synaptic connections between 
                  photoreceptors and bipolar cells during development? How are rod and cone photoresponses 
                  integrated in the outer retina to provide a seamless shift from rod vision to cone vision 
                  as the light intensity increases?
                </li>
                <li>
                  What is the role of retinal remodeling in controlling visual sensitivity during photoreceptor 
                  degeneration? How is this remodeling affected when vision is restored with gene therapy?
                </li>
                <li>
                  How is retinal structure and function altered or conserved across the animal kingdom? What 
                  are the implications of these similarities and differences for the evolution of the vertebrate 
                  retina?
                </li>
              </ul>
            </div>

            <p className="text-gray-800">
              These questions remain of great interest because of the large proportion of visual deficits arising 
              from abnormal signaling, either within the phototransduction cascade or in synaptic transmission 
              from photoreceptor terminals to bipolar cells. To answer these questions, we employ classical 
              (but still state-of-the-art) physiological techniques to measure light-evoked responses of 
              photoreceptors, bipolar cells, and ganglion cells, which let us determine how the functional 
              properties of responses are constructed by the retinal circuitry.
            </p>
          </div>
        </div>

        {/* Publications Section */}
        <div className="mt-12">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Publications</h2>
  <div className="space-y-3">  {/* Changed from space-y-6 to space-y-3 */}
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