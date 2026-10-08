// Generates src/sitemap.xml with today's date.
// Run automatically as part of the build via the "prebuild" npm script.

const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0];

const mainDomain = 'https://loom21.com';
const appDomain = 'https://app.loom21.com';

// Pages on the main marketing site
const mainPages = [
  { path: '/',               changefreq: 'weekly',  priority: '0.8' },
  { path: '/docs/',          changefreq: 'weekly',  priority: '0.7' },
  { path: '/pricing/',       changefreq: 'weekly',  priority: '0.8' },
  { path: '/contact/',       changefreq: 'monthly', priority: '0.7' },
  { path: '/faq/',           changefreq: 'monthly', priority: '0.6' },
  { path: '/roadmap/',       changefreq: 'weekly',  priority: '0.5' },
  { path: '/privacy-policy/', changefreq: 'monthly', priority: '0.4' },
  { path: '/terms/',         changefreq: 'yearly',  priority: '0.3' },
];

// Pages on the app subdomain (external — not built here, but included for search coverage)
const appPages = [
  { path: '/login/',  changefreq: 'monthly', priority: '0.8' },
  { path: '/signup/', changefreq: 'monthly', priority: '0.8' },
];

const langs = ['en', 'bg'];
// The app subdomain uses 'en-US' as its English locale prefix
const appLangPrefix = { en: 'en-US', bg: 'bg' };

function mainUrl(lang, pagePath) {
  return `${mainDomain}/${lang}${pagePath}`;
}

function appUrl(lang, pagePath) {
  return `${appDomain}/${appLangPrefix[lang]}${pagePath}`;
}

function buildEntry(loc, enHref, bgHref, changefreq, priority) {
  return `    <url>
        <loc>${loc}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
        <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
        <xhtml:link rel="alternate" hreflang="bg" href="${bgHref}" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}" />
    </url>`;
}

const entries = [];

for (const page of mainPages) {
  for (const lang of langs) {
    entries.push(buildEntry(
      mainUrl(lang, page.path),
      mainUrl('en', page.path),
      mainUrl('bg', page.path),
      page.changefreq,
      page.priority
    ));
  }
}

for (const page of appPages) {
  for (const lang of langs) {
    entries.push(buildEntry(
      appUrl(lang, page.path),
      appUrl('en', page.path),
      appUrl('bg', page.path),
      page.changefreq,
      page.priority
    ));
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, '../src/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log(`Sitemap generated: ${outputPath} (lastmod: ${today})`);
