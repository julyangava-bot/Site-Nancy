import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pinkdogpetresort.com';

  const routes = [
    '',
    '/about',
    '/philosophy',
    '/pet-hotel',
    '/daycare',
    '/grooming',
    '/van-service',
    '/faq',
    '/privacy-policy',
    '/terms',
    '/data-deletion',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
} 