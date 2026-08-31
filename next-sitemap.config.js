

/** @type {IConfig} */
const config = {
  siteUrl: 'https://mobiletyrechampions.com',
  generateRobotsTxt: true,
  // Exclude any URL that contains a query string
  exclude: ['/**?*'],
  // Strip query params from the generated loc values
  transform: async (config, url) => {
    const cleanUrl = url.split('?')[0];
    return {
      loc: cleanUrl,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    };
  },
  // Optional: set a default priority / changefreq if needed
  changefreq: 'weekly',
  priority: 0.8,
};

export default config;
