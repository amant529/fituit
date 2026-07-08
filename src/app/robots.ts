import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/settings/', '/session/', '/api/', '/onboarding/', '/paywall/'],
    },
    sitemap: 'https://FITUIT.app/sitemap.xml',
  };
}
