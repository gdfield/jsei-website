import { notFound } from 'next/navigation';
import PersonProfile, { personMeta } from '../../components/PersonProfile';
import { allProjectScientistSlugs, traineeBySlug, isActive, isProjectScientist } from '../../data/trainees';

// Profiles of project scientists who joined through the intake form.
export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return allProjectScientistSlugs().map((slug) => ({ slug }));
}

const find = (slug) => {
  const t = traineeBySlug(slug);
  return t && isActive(t) && isProjectScientist(t) ? t : null;
};

export function generateMetadata({ params }) {
  const t = find(params.slug);
  return t ? personMeta(t) : {};
}

export default function ProjectScientistProfilePage({ params }) {
  const t = find(params.slug);
  if (!t) notFound();
  return <PersonProfile person={t} back={{ href: '/scientists', label: 'All scientists' }} />;
}
