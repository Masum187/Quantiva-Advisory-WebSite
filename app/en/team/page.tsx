import JsonLd from '../../components/JsonLd';
import TeamRedesign from '../../components/pages/team/TeamRedesign';
import { breadcrumbListJsonLd, pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Team',
  description:
    'The people behind Quantiva: consultants, architects and analysts who do not just recommend transformation, but build it.',
  path: '/team',
  lang: 'en',
});

export default function TeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('en', [{ name: 'Team', path: '/team' }])} />
      <TeamRedesign lang="en" />
    </>
  );
}
