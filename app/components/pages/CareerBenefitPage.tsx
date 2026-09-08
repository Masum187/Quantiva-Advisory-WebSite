import type { ComponentType } from 'react';
import type { CareerBenefitSlug } from '../../lib/data/careerBenefits';
import type { CareerThemeProps } from './career-benefits/shared';
import MentalHealthPage from './career-benefits/MentalHealthPage';
import CommunityPage from './career-benefits/CommunityPage';
import PhysicalHealthPage from './career-benefits/PhysicalHealthPage';
import PurposePage from './career-benefits/PurposePage';
import CareerDevelopmentPage from './career-benefits/CareerDevelopmentPage';
import GlobalPerspectivesPage from './career-benefits/GlobalPerspectivesPage';
import FinancialRewardsPage from './career-benefits/FinancialRewardsPage';

interface CareerBenefitPageProps {
  lang: 'de' | 'en';
  slug: CareerBenefitSlug;
}

/**
 * Slim dispatcher: every culture & benefits topic has its own, clearly
 * distinguishable visual theme. The content itself comes from
 * `careerBenefits.ts`.
 */
const themeComponents: Record<CareerBenefitSlug, ComponentType<CareerThemeProps>> = {
  'mental-health': MentalHealthPage,
  community: CommunityPage,
  'physical-health': PhysicalHealthPage,
  purpose: PurposePage,
  'career-development': CareerDevelopmentPage,
  'global-perspectives': GlobalPerspectivesPage,
  'financial-rewards': FinancialRewardsPage,
};

export default function CareerBenefitPage({ lang, slug }: CareerBenefitPageProps) {
  const ThemeComponent = themeComponents[slug];
  return <ThemeComponent lang={lang} />;
}
