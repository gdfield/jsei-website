import { notFound } from 'next/navigation';
import PersonProfile, { personMeta } from '../../components/PersonProfile';
import { allTraineeSlugs, traineeBySlug, isActive, isProjectScientist } from '../../data/trainees';

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return allTraineeSlugs().map((slug) => ({ slug }));
}

// Project scientists have their profile at /scientists/<slug> instead.
const find = (slug) => {
  const t = traineeBySlug(slug);
  return t && isActive(t) && !isProjectScientist(t) ? t : null;
};

export function generateMetadata({ params }) {
  const t = find(params.slug);
  return t ? personMeta(t) : {};
}

export default function TraineeProfilePage({ params }) {
  const t = find(params.slug);
  if (!t) notFound();
  return <PersonProfile person={t} back={{ href: '/trainees', label: 'All trainees' }} />;
}
