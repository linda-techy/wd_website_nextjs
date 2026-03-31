import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/(auth)/',
          '/partnerships/login',
          '/partnerships/dashboard',
          '/partnerships/register',
        ],
      },
    ],
    sitemap: 'https://walldotbuilders.com/sitemap.xml',
    host: 'https://walldotbuilders.com',
  }
}
