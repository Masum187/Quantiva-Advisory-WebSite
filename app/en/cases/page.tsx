import { Metadata } from 'next';
import casesData from '../../lib/data/cases.json';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'References & Cases – Quantiva Advisory',
  description: 'Success stories and reference projects in SAP, Cloud, AI, Integration and Cyber Security.',
  alternates: {
    canonical: '/en/cases',
    languages: {
      'de-DE': '/de/cases',
      'en-US': '/en/cases',
    },
  },
};

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            References & Success Stories
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl">
            Success stories from various industries and technologies.
            Discover how we help our clients achieve digital excellence.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casesData.map((caseItem) => (
            <Link
              key={caseItem.slug}
              href={`/en/cases/${caseItem.slug}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              {caseItem.heroImage && (
                <div className="relative h-48 bg-gradient-to-br from-teal-500 to-teal-600 overflow-hidden">
                  <Image
                    src={caseItem.heroImage}
                    alt={caseItem.titleEn}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                    {caseItem.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                    {caseItem.industry}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {caseItem.titleEn}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {caseItem.subtitleEn}
                </p>

                {/* Technologies */}
                {caseItem.tech && caseItem.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {caseItem.tech.slice(0, 3).map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {caseItem.tech.length > 3 && (
                      <span className="px-2 py-1 text-slate-500 text-xs">
                        +{caseItem.tech.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Let&apos;s write your success story together
          </h2>
          <p className="text-teal-100 mb-8 text-lg">
            Contact us for a non-binding consultation.
          </p>
          <Link
            href="/en#contact"
            className="inline-block px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Get in touch now
          </Link>
        </div>
      </section>
    </div>
  );
}

