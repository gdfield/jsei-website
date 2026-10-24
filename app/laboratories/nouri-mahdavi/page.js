import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0001-9403-8904';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/nouri-mahdavi',
  title: "Kouros Nouri-Mahdavi Laboratory",
  description: "Dr. Nouri-Mahdavi works to improve glaucoma assessment and management, including detecting disease progression and AI-based diagnostic methods.",
  image: "/images/faculty/kouros2.jpg",
  imageAlt: "Dr. Kouros Nouri-Mahdavi",
});

export default async function NouriMahdaviPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Nouri-Mahdavi' });

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kouros Nouri-Mahdavi",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/nouri-mahdavi",
  "description": "Dr. Nouri-Mahdavi's research focuses on improving the assessment and management of glaucoma using advanced statistical techniques, imaging technologies, and AI approaches to enhance glaucoma diagnostics and detect disease progression.",
  "knowsAbout": [
    "Glaucoma",
    "Ocular Imaging",
    "AI",
    "Disease Progression"
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
        title="Kouros Nouri-Mahdavi Laboratory"
        subtitle="Glaucoma Diagnostics and Advanced Imaging"
        description="Advancing the early detection and treatment of glaucoma through innovative imaging and AI technologies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/kouros2.jpg"
          alt="Dr. Kouros Nouri-Mahdavi"
          name="Kouros Nouri-Mahdavi, M.D., M.Sc."
          titles={[
            "Professor",
            "Kay K. Pick Endowed Chair in Glaucoma Research",
            "Department of Ophthalmology",
            "Chief, Glaucoma Division",
            "Director, Glaucoma Advanced Imaging and AI Laboratory",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:nouri-mahdavi@jsei.ucla.edu", label: "nouri-mahdavi@jsei.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/kouros.nouri-mahdavi", label: "Faculty profile" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
            Dr. Nouri-Mahdavi has an active clinical practice managing adult glaucoma patients and complex cataract surgeries. Dr. Nouri-Mahdavi's research focuses on functional and structural measurements for optimizing diagnosis of glaucoma and detection of disease progression, use of machine learning approaches in glaucoma diagnostics, and study of surgical outcomes in glaucoma. He has been the recipient of many awards including the American Academy of Ophthalmology's Secretariat and Achievement Awards, American Glaucoma Society MAPS Grant Award, the American Glaucoma Society Early and Mid-Career Clinician Scientist Awards, the Gerald Oppenheimer Family Foundation Center for Prevention of Eye Disease Award, Senior Alcon Research Award, and NIH K23 and R01 awards. He has been the co-recipient of UCLA Innovation Awards in 2018 and 2019 for translational research projects. His research is currently funded by an NIH R01 award to optimize detection of glaucoma progression in eyes with advanced glaucoma.
                      </p>
            
            <p className="text-ink-soft">
            Dr. Nouri-Mahdavi is a clinician-scientist who continues to teach and publish extensively. He frequently lectures at national and international meetings. He is currently a member of the American Academy of Ophthalmology's (AAO), Association for Research in Vision and Ophthalmology, and the Chair of the AGS' Annual Meeting Committee. He serves on the Editorial Boards of Journal of Glaucoma, International Glaucoma Review, and Journal of Ophthalmic and Vision Research.
            </p>
        </LabProfile>

        <LabTrainees lab="nouri-mahdavi" />

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