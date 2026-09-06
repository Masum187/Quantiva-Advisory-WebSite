import type { ComponentType } from 'react';
import type { CareerAreaSlug } from '../../lib/data/careerAreas';
import type { CareerThemeProps } from './career-areas/shared';
import TechnologyEngineeringPage from './career-areas/TechnologyEngineeringPage';
import SapSolutionsPage from './career-areas/SapSolutionsPage';
import CloudInfrastructurePage from './career-areas/CloudInfrastructurePage';
import CyberSecurityPage from './career-areas/CyberSecurityPage';
import ArtificialIntelligencePage from './career-areas/ArtificialIntelligencePage';

interface CareerAreaPageProps {
  lang: 'de' | 'en';
  slug: CareerAreaSlug;
}

/**
 * Slim dispatcher: every career area has its own, clearly distinguishable
 * visual theme. The content itself still comes from `careerAreas.ts`.
 */
const themeComponents: Record<CareerAreaSlug, ComponentType<CareerThemeProps>> = {
  'technology-engineering': TechnologyEngineeringPage,
  'sap-solutions': SapSolutionsPage,
  'cloud-infrastructure': CloudInfrastructurePage,
  'cyber-security': CyberSecurityPage,
  'artificial-intelligence': ArtificialIntelligencePage,
};

export default function CareerAreaPage({ lang, slug }: CareerAreaPageProps) {
  const ThemeComponent = themeComponents[slug];
  return <ThemeComponent lang={lang} />;
}
