/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://arabsinblockchain.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  // Exclude Next.js internals and non-page routes
  exclude: ['/404', '/_not-found', '/ar/not-found', '/en/not-found'],
  // Treat ar as the primary locale
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://arabsinblockchain.com'}/ar`,
      hreflang: 'ar',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://arabsinblockchain.com'}/en`,
      hreflang: 'en',
    },
  ],
};
