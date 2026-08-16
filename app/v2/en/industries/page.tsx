import Link from 'next/link';
import { industriesEn } from '../../../lib/data/industries';
import ForgePageLayout from '../../../components/forge/ForgePageLayout';
import { forgePath } from '../../../lib/data/forge-content';

export const metadata = { title: 'Industries — Quantiva Forge' };

export default function Page() {
  const locale = 'en' as const;
  const list = industriesEn;
  return (
    <ForgePageLayout
      locale={locale}
      eyebrow="INDUSTRIES"
      title="Industries."
      lead="Regulated and growth markets — with delivery experience."
    >
      <div className="forge-container">
        <ul className="divide-y divide-[var(--forge-line)] border-y border-[var(--forge-line)]">
          {list.map((item, index) => (
            <li key={item.slug}>
              <Link
                href={forgePath(locale, `/industries/${item.slug}`)}
                className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between"
              >
                <div className="flex gap-5">
                  <span className="forge-meta text-[var(--forge-signal)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-2xl tracking-tight">{item.title}</h2>
                    <p className="mt-2 text-[var(--forge-muted)]">{item.description}</p>
                  </div>
                </div>
                <span className="forge-meta">{item.projects}+ projects</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ForgePageLayout>
  );
}
