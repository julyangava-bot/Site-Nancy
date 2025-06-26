import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/_next/',
          '/admin/',
          '*.json',
          '/services/',
          '/contact-us',
          '/contact',
          '/about-us',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/services/',
          '/contact-us',
          '/contact',
          '/about-us',
        ],
      },
    ],
    sitemap: 'https://pinkdogpetresort.com/sitemap.xml',
    host: 'https://pinkdogpetresort.com',
  };
} 