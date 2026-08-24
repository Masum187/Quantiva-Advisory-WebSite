import ContactForm from '../ContactForm';
import content from '../../lib/data/content.json';
import { V3_PAGES, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3ContactPage({ locale }: { locale: V3Locale }) {
  const page = V3_PAGES[locale].contact;
  const contact = content.contact[locale];

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sectionLabel={locale === 'de' ? 'Kontakt' : 'Contact'}
    >
      <section className="v3-contact-layout" aria-labelledby="v3-contact-form-title">
        <div>
          <p className="v3-section-index">01 / {contact.title}</p>
          <h2 id="v3-contact-form-title">{contact.subtitle}</h2>
          <dl>
            <div>
              <dt>{locale === 'de' ? 'Fokus' : 'Focus'}</dt>
              <dd>SAP · Test · Cutover · Cloud · AI</dd>
            </div>
            <div>
              <dt>{locale === 'de' ? 'Arbeitsmodell' : 'Working model'}</dt>
              <dd>{locale === 'de' ? 'Direkt · senior · entscheidungsorientiert' : 'Direct · senior · decision-oriented'}</dd>
            </div>
            <div>
              <dt>{locale === 'de' ? 'Antwort' : 'Response'}</dt>
              <dd>{locale === 'de' ? 'Mit einem konkreten nächsten Schritt' : 'With a concrete next step'}</dd>
            </div>
          </dl>
        </div>
        <div className="v3-contact-form">
          <ContactForm lang={locale} />
        </div>
      </section>
    </V3PageLayout>
  );
}
