import { industriesDe } from '../../../../lib/data/industries';
import ForgeIndustryPage from '../../../../components/forge/ForgeIndustryPage';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industriesDe.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = industriesDe.find((i) => i.slug === slug);
  return { title: `${industry?.title ?? slug} — Quantiva Forge` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ForgeIndustryPage locale="de" slug={slug} />;
}
