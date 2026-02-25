import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pinkdogpetresort.com';
  const currentDate = new Date();

  // Main pages with high priority
  const mainPages = [
    { route: '', priority: 1.0, frequency: 'daily' as const },
    { route: '/pet-hotel', priority: 0.9, frequency: 'weekly' as const },
    { route: '/daycare', priority: 0.9, frequency: 'weekly' as const },
    { route: '/grooming', priority: 0.9, frequency: 'weekly' as const },
    { route: '/van-service', priority: 0.8, frequency: 'weekly' as const },
  ];

  // About pages
  const aboutPages = [
    { route: '/about', priority: 0.8, frequency: 'monthly' as const },
    { route: '/philosophy', priority: 0.7, frequency: 'monthly' as const },
  ];

  // Resource pages
  const resourcePages = [
    { route: '/faq', priority: 0.7, frequency: 'weekly' as const },
  ];

  // Legal pages
  const legalPages = [
    { route: '/privacy-policy', priority: 0.3, frequency: 'yearly' as const },
  ];

  // Add contact section with hash
  const contactSection = [
    { route: '/#checkin-info', priority: 0.9, frequency: 'monthly' as const },
  ];

  const allPages = [...mainPages, ...aboutPages, ...resourcePages, ...legalPages, ...contactSection];

  return allPages.map(({ route, priority, frequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: frequency,
    priority: priority,
  }));
} 