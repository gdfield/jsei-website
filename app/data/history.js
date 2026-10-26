// Content for the Institute History page (app/history/page.js).
//
// Every fact here was checked against the sources listed with it (October 2026).
// Before publishing, settle the open items in claude/leadership-bios-draft.md in
// the JSEI Website project (Straatsma's AJO editorship years, Mondino's name
// spelling, Coleman "first woman").
//
// Photos: put a portrait in public/images/history/ (or reuse one in
// public/images/faculty/) and set `photo` below. Until then the page shows the
// person's initials. Use only photos JSEI has the right to publish.

// Research achievements for the opening section, oldest first. Each entry was
// checked against its PubMed record (October 2026); `paper` links to it.
// General source: Ophthalmology Times, "Jules Stein Eye Institute milestones in
// research" (Nov 1, 2006), https://www.ophthalmologytimes.com/view/jules-stein-eye-institute-milestones-research
// Not included: the 1999 Stargardt (abcr) knockout mouse, which PubMed shows was
// made at UT Southwestern before Gabriel Travis moved to UCLA.
export const achievementsIntro =
  'Scientists at the institute have revealed how the cells and proteins of the eye work, and why they fail, laying the groundwork for better treatments.';

export const achievements = [
  {
    year: '1967',
    who: 'Richard Young',
    text: 'Discovered that photoreceptors constantly rebuild their light-sensing outer segments.',
    paper: 'https://doi.org/10.1083/jcb.33.1.61', // Young RW, J Cell Biol 1967;33:61-72, PMID 6033942
  },
  {
    year: '1969',
    who: 'Richard Young and Dean Bok',
    text: 'Showed that the pigment epithelium clears away the tips photoreceptors shed every day.',
    paper: 'https://doi.org/10.1083/jcb.42.2.392', // Young RW, Bok D, J Cell Biol 1969;42:392-403, PMID 5792328
  },
  {
    year: '1971',
    who: 'Dean Bok and Michael Hall',
    text: 'Showed that a failing pigment epithelium can cause inherited blindness.',
    paper: 'https://doi.org/10.1083/jcb.49.3.664', // Bok D, Hall MO, J Cell Biol 1971;49:664-82, PMID 5092207
  },
  {
    year: '1974',
    who: 'Deborah Farber and Richard Lolley',
    text: 'Linked inherited retinal degeneration to a buildup of cyclic GMP in photoreceptors.',
    paper: 'https://doi.org/10.1126/science.186.4162.449', // Farber DB, Lolley RN, Science 1974;186:449-51, PMID 4369896 (no affiliation on the PubMed record)
  },
  {
    year: '1982',
    who: 'Gary Holland and colleagues',
    text: 'Gave the first description of how AIDS attacks the eye.',
    paper: 'https://doi.org/10.1016/0002-9394(82)90127-1', // Holland GN et al., Am J Ophthalmol 1982;93:393-402, PMID 6280503
  },
  {
    year: '1989',
    who: 'Suraj Bhat and C. N. Nagineni',
    text: 'Found that alphaB-crystallin, long thought a lens protein, is made throughout the body.',
    paper: 'https://doi.org/10.1016/s0006-291x(89)80215-3', // Bhat SP, Nagineni CN, Biochem Biophys Res Commun 1989;158:319-25, PMID 2912453
  },
  {
    year: '1990',
    who: 'Wayne Hubbell and colleagues',
    text: 'Invented site-directed spin labeling to map the structure of membrane proteins.',
    paper: 'https://doi.org/10.1126/science.2160734', // Altenbach C, Marti T, Khorana HG, Hubbell WL, Science 1990;248:1088-92, PMID 2160734
  },
  {
    year: '1990',
    who: 'Deborah Farber and colleagues',
    text: 'Found the gene behind retinal degeneration in the rd mouse.',
    paper: 'https://doi.org/10.1038/347677a0', // Bowes C ... Farber DB, Nature 1990;347:677-80, PMID 1977087
  },
  {
    year: '1992',
    who: 'Joseph Horwitz',
    text: 'Discovered that alpha-crystallin, the lens’s main protein, is a molecular chaperone.',
    paper: 'https://doi.org/10.1073/pnas.89.21.10449', // Horwitz J, PNAS 1992;89:10449-53, PMID 1438232
  },
  {
    year: '1995',
    who: 'Joseph Demer and colleagues',
    text: 'Discovered the pulleys that steer the eye muscles.',
    paper: 'https://pubmed.ncbi.nlm.nih.gov/7730022/', // Demer JL et al., Invest Ophthalmol Vis Sci 1995;36:1125-36, PMID 7730022
  },
  {
    year: '1995',
    who: 'Sherwin Isenberg and Leonard Apt',
    text: 'Showed that inexpensive povidone-iodine drops prevent newborn eye infections better than standard care.',
    paper: 'https://doi.org/10.1056/NEJM199503023320903', // Isenberg SJ, Apt L, Wood M, N Engl J Med 1995;332:562-6, PMID 7838190
  },
  {
    year: '1996',
    who: 'Wayne Hubbell, with Gobind Khorana at MIT',
    text: 'Showed that rhodopsin switches on by shifting its helices, a model for how G-protein-coupled receptors activate.',
    paper: 'https://doi.org/10.1126/science.274.5288.768', // Farrens DL ... Hubbell WL, Khorana HG, Science 1996;274:768-70, PMID 8864113
  },
];

// Institutional milestones, oldest first. Sources: UCLA Health "UCLA Stein Eye
// Institute" history page; UCLA Health Straatsma memorial page; NEI tribute to
// Jules Stein; UCLA Stein Eye Institute Annual Report 2016-17; UCLA Fielding
// School news, June 2, 2022.
export const milestones = [
  { year: '1959', text: 'Bradley Straatsma arrives at UCLA as the first chief of the Division of Ophthalmology.' },
  { year: '1960', text: 'Jules Stein founds Research to Prevent Blindness.' },
  { year: '1961', text: 'Straatsma and Stein begin planning an eye institute at UCLA.' },
  { year: '1966', text: 'The Jules Stein Eye Institute opens, with Straatsma as its first director.' },
  { year: '1968', text: 'UCLA establishes the Department of Ophthalmology, and Congress creates the National Eye Institute after a campaign led by Stein.' },
  { year: '1994', text: 'Bartly Mondino succeeds Straatsma as director and chair.' },
  { year: '2017', text: 'The renovated Jules Stein Building reopens in the institute’s 50th anniversary year.' },
  { year: '2022', text: 'Anne Coleman becomes director and chair.' },
];

// Founder and directors. Bios: claude/leadership-bios-draft.md in the project.
export const leaders = [
  {
    slug: 'stein',
    name: 'Jules C. Stein, MD',
    role: 'Founder',
    years: '1896 to 1981',
    photo: null, // e.g. '/images/history/stein.jpg'
    bio: [
      'Jules Stein trained as an ophthalmologist before building one of the most influential companies in American entertainment, and he spent the second half of his life fighting blindness. Born in South Bend, Indiana, in 1896, he graduated from the University of Chicago in 1915 and earned his medical degree at Rush Medical College in 1921, followed by a year of study at the University of Vienna. He paid for medical school by booking bands for Chicago nightclubs, and in 1924 he founded the Music Corporation of America (MCA), leaving clinical practice soon after.',
      'Stein never left ophthalmology behind. In 1960 he founded Research to Prevent Blindness, a nonprofit that funds eye research at universities nationwide, and his campaign before Congress helped establish the National Eye Institute in 1968. With his wife, Doris, he created the Jules Stein Eye Institute at UCLA, which opened in 1966 as a home for research, patient care, and training under one roof. He received the Albert Lasker Public Service Award in 1975 and died in Los Angeles in 1981. The Doris Stein Eye Research Center, dedicated in 1989, carries his wife’s name.',
    ],
  },
  {
    slug: 'straatsma',
    name: 'Bradley R. Straatsma, MD, JD',
    role: 'Founding Director',
    years: 'Director 1966 to 1994',
    photo: null, // e.g. '/images/history/straatsma.jpg'
    bio: [
      'Bradley Straatsma built UCLA ophthalmology from a small division into the Jules Stein Eye Institute and led it for nearly three decades. Born in Grand Rapids, Michigan, he earned his medical degree at Yale in 1951, served in the U.S. Navy’s Underwater Demolition Team, and trained at Columbia’s Harkness Eye Institute, the Armed Forces Institute of Pathology, and the Wilmer Eye Institute at Johns Hopkins. He came to UCLA in 1959 as the first chief of its Division of Ophthalmology.',
      'In 1961 Straatsma began working with Jules Stein on the plan that became the institute, and he served as its first director when it opened in 1966. He became founding chair of the Department of Ophthalmology in 1968 and led both until 1994. A specialist in vitreoretinal disease and ocular tumors, he wrote more than 575 scientific papers, was editor-in-chief of the American Journal of Ophthalmology until 2002, and served as president of the American Academy of Ophthalmology and the American Ophthalmological Society. He earned a law degree in 2002, helped establish the Magrabi ICO Cameroon Eye Institute, which opened in 2016, and died in Los Angeles on April 16, 2026, at 98.',
    ],
  },
  {
    slug: 'mondino',
    name: 'Bartly J. Mondino, MD',
    role: 'Director',
    years: '1994 to 2022',
    photo: null, // e.g. '/images/history/mondino.jpg'
    bio: [
      'Bartly Mondino succeeded Bradley Straatsma in 1994 and led the Jules Stein Eye Institute and the UCLA Department of Ophthalmology for 28 years. He earned his medical degree at Stanford in 1971, completed his ophthalmology residency at New York Hospital, Cornell University Medical Center, and trained in cornea and external disease at the University of Pittsburgh. His research on corneal and external eye disease and ocular immunology produced more than 300 publications and two NIH R01 grants that he held for nearly 20 years.',
      'As director, Mondino grew the institute into a vision science campus and raised more than $317 million in support, including funds for 33 endowed chairs. He served as executive vice president of the Association of University Professors of Ophthalmology and was the American Academy of Ophthalmology’s Guest of Honor in 2020. He stepped down as director and chair in 2022 and remains a Distinguished Professor of Ophthalmology.',
    ],
  },
  {
    slug: 'coleman',
    name: 'Anne L. Coleman, MD, PhD',
    role: 'Director',
    years: 'since 2022',
    photo: '/images/faculty/coleman.jpg',
    bio: [
      'Anne Coleman became director of the Stein Eye Institute and chair of the UCLA Department of Ophthalmology on July 1, 2022, the first woman to hold these roles. A native of Richmond, Virginia, she earned a chemistry degree at Duke and her medical degree at the Medical College of Virginia, completed her residency at the University of Illinois at Chicago and a glaucoma fellowship at the Wilmer Eye Institute, and later earned a PhD in epidemiology at the UCLA Fielding School of Public Health in 1997.',
      'Coleman’s research spans the diagnosis, risk factors, gene-environment interactions, and public health burden of glaucoma, cataract, myopia, amblyopia, and macular degeneration, and she led a clinical trial that pioneered use of the Ahmed glaucoma valve. As director of the UCLA Mobile Eye Clinic since 2012, she has overseen screening and treatment for more than 180,000 low-income children and adults in Southern California. She holds the Bradley R. Straatsma, MD, Endowed Chair in Ophthalmology, served as the 2020 president of the American Academy of Ophthalmology, and was elected to the National Academy of Medicine in 2016.',
    ],
  },
];
