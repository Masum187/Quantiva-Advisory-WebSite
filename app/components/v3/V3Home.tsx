import { V3_HOME, type V3Locale } from '../../lib/data/v3-content';
import Capabilities from './sections/Capabilities';
import ClosingFooter from './sections/ClosingFooter';
import Manifesto from './sections/Manifesto';
import ProjectIndex from './sections/ProjectIndex';
import ServicesStage from './sections/ServicesStage';
import V3Hero from './V3Hero';

export default function V3Home({ locale }: { locale: V3Locale }) {
  const content = V3_HOME[locale];

  return (
    <>
      <V3Hero locale={locale} />

      <div id="v3-marquee" className="v3-marquee" aria-label={content.marquee}>
        <div className="v3-marquee-track">
          <span>{content.marquee}</span>
          <span aria-hidden="true">{content.marquee}</span>
        </div>
      </div>

      <ProjectIndex locale={locale} />
      <ServicesStage locale={locale} />
      <Manifesto locale={locale} />
      <Capabilities locale={locale} />
      <ClosingFooter locale={locale} />
    </>
  );
}
