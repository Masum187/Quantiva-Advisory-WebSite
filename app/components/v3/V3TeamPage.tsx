import team from '../../lib/data/team.json';
import { V3_PAGES, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3TeamPage({ locale }: { locale: V3Locale }) {
  const page = V3_PAGES[locale].team;
  const members = [...team].sort((a, b) => a.order - b.order);

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sectionLabel="Team"
    >
      <section className="v3-numbered-section" aria-labelledby="v3-team-title">
        <div className="v3-section-heading">
          <p className="v3-section-index">01 / Team</p>
          <h2 id="v3-team-title">
            {locale === 'de' ? 'Die Menschen hinter der Verantwortung.' : 'The people behind the ownership.'}
          </h2>
        </div>
        <div className="v3-team-grid">
          {members.map((member, index) => (
            <article key={member.id}>
              <div className="v3-monogram-card" role="img" aria-label={`${member.name} · ${member.initials}`}>
                <span>{member.initials}</span>
                <small>{String(index + 1).padStart(2, '0')} / Q</small>
              </div>
              <p>{locale === 'de' ? member.roleDe : member.roleEn}</p>
              <h3>{member.name}</h3>
              <p>{locale === 'de' ? member.expertiseDe : member.expertiseEn}</p>
              <p>{locale === 'de' ? member.descriptionDe : member.descriptionEn}</p>
            </article>
          ))}
        </div>
      </section>
    </V3PageLayout>
  );
}
