import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/de', '/en'],
      disallow: [
        '/v2',
        '/v3',
        '/de/ai-test',
        '/de/cms',
        '/de/video-generation',
        '/en/video-generation',
        '/api/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
