import JsonLd from '../../components/JsonLd';
import TeamRedesign from '../../components/pages/team/TeamRedesign';
import { breadcrumbListJsonLd, pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Team',
  description:
    'Die Menschen hinter Quantiva: Beraterinnen, Architekten und Analystinnen, die Transformation nicht nur empfehlen, sondern bauen.',
  path: '/team',
  lang: 'de',
});

export default function TeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('de', [{ name: 'Team', path: '/team' }])} />
      <TeamRedesign lang="de" />
    </>
  );
}
