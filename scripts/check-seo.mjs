#!/usr/bin/env node
/**
 * Pre-deploy SEO check: crawls the site the way Google does and fails on anything that
 * Search Console reports ("Page with redirect", "Not found (404)", "Duplicate without
 * user-selected canonical", "Alternate page with proper canonical tag", hreflang errors).
 *
 * Usage:
 *   npm run build && npm run serve:ssr:loom21website   (in another terminal, PORT=4321)
 *   node scripts/check-seo.mjs                          (checks http://localhost:4321)
 *   node scripts/check-seo.mjs https://loom21.com       (checks production after deploy)
 *
 * URLs on https://loom21.com inside pages are mapped to the base URL being checked.
 */
import { readFileSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
const SITE = 'https://loom21.com';
const LOCAL_SITEMAP = 'dist/loom21website/sitemap.xml';

const errors = [];
const warnings = [];
const fail = (url, msg) => errors.push(`${url}  →  ${msg}`);
const warn = (url, msg) => warnings.push(`${url}  →  ${msg}`);

const toBase = (u) => (u.startsWith(SITE) ? BASE + u.slice(SITE.length) : u);
const toSite = (u) => (u.startsWith(BASE) ? SITE + u.slice(BASE.length) : u);

const cache = new Map();
async function get(url) {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(toBase(url), { redirect: 'manual', headers: { 'User-Agent': 'loom21-seo-check' } }).then(async (r) => ({
        status: r.status,
        location: r.headers.get('location'),
        body: r.headers.get('content-type')?.includes('html') ? await r.text() : '',
      }))
    );
  }
  return cache.get(url);
}

/** Follows redirects and returns the hops, e.g. [301, 200]. */
async function chain(url, max = 5) {
  const hops = [];
  let current = url;
  for (let i = 0; i < max; i++) {
    const r = await get(current);
    hops.push({ url: current, status: r.status });
    if (r.status < 300 || r.status >= 400 || !r.location) break;
    current = new URL(r.location, toBase(current)).href;
    current = toSite(current);
  }
  return hops;
}

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const tags = (html, re) => html.match(re) || [];

// ---------- 1. Sitemap ----------
let sitemapXml;
try {
  sitemapXml = BASE.startsWith('http://localhost') ? readFileSync(LOCAL_SITEMAP, 'utf8') : (await get(`${SITE}/sitemap.xml`)).body;
  if (!sitemapXml) sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
} catch {
  sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
}
const sitemapEntries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>([^<]+)<\/loc>/)[1].trim(),
  alternates: Object.fromEntries(
    [...m[1].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((a) => [a[1], a[2]])
  ),
}));
const sitemapUrls = new Set(sitemapEntries.map((e) => e.loc));
if (!sitemapEntries.length) fail('sitemap.xml', 'no <url> entries found');

// ---------- 2. robots.txt ----------
const robots = await (await fetch(`${BASE}/robots.txt`)).text();
if (!/Sitemap:\s*https:\/\/loom21\.com\/sitemap\.xml/i.test(robots)) warn('robots.txt', 'does not reference https://loom21.com/sitemap.xml');
const disallows = [...robots.matchAll(/^Disallow:\s*(\S+)/gim)].map((m) => m[1]);

// ---------- 3. Every sitemap page ----------
const internalLinks = new Map(); // link → first page it was seen on
const pageAlternates = new Map();

for (const { loc, alternates } of sitemapEntries) {
  const path = new URL(loc).pathname;
  if (!path.endsWith('/')) fail(loc, 'sitemap URL has no trailing slash (the server redirects it)');
  if (disallows.some((d) => d !== '/' ? path.startsWith(d) : true)) fail(loc, 'blocked by robots.txt');

  const r = await get(loc);
  if (r.status !== 200) {
    fail(loc, `sitemap URL answers ${r.status}${r.location ? ` → ${r.location}` : ''} (must be 200)`);
    continue;
  }
  const html = r.body;
  const head = html.slice(0, html.indexOf('</head>'));

  // canonical
  const canonicals = tags(head, /<link[^>]*rel="canonical"[^>]*>/g).map((t) => attr(t, 'href'));
  if (canonicals.length !== 1) fail(loc, `${canonicals.length} canonical tags (must be exactly 1)`);
  else if (canonicals[0] !== loc) fail(loc, `canonical is ${canonicals[0]} (must be the page itself)`);

  // robots meta
  if (/<meta[^>]*name="robots"[^>]*noindex/i.test(head)) fail(loc, 'has noindex');

  // lang
  const lang = path.split('/')[1];
  const htmlLang = html.match(/<html[^>]*\slang="([^"]*)"/)?.[1];
  if (htmlLang !== lang) fail(loc, `<html lang="${htmlLang}"> (expected "${lang}")`);

  // title / description
  const title = head.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) fail(loc, 'missing <title>');
  const desc = tags(head, /<meta[^>]*name="description"[^>]*>/g);
  if (desc.length !== 1 || !attr(desc[0], 'content')) fail(loc, `${desc.length} meta descriptions (must be exactly 1, non-empty)`);

  // og:url should match canonical if present
  const ogUrl = tags(head, /<meta[^>]*property="og:url"[^>]*>/g).map((t) => attr(t, 'content'))[0];
  if (ogUrl && ogUrl !== loc) warn(loc, `og:url is ${ogUrl}`);

  // hreflang
  const alts = {};
  for (const t of tags(head, /<link[^>]*rel="alternate"[^>]*hreflang[^>]*>/g)) {
    const hl = attr(t, 'hreflang');
    if (alts[hl]) fail(loc, `duplicate hreflang="${hl}"`);
    alts[hl] = attr(t, 'href');
  }
  pageAlternates.set(loc, alts);
  for (const hl of ['en', 'bg', 'x-default']) {
    if (!alts[hl]) fail(loc, `missing hreflang="${hl}"`);
  }
  if (alts[lang] && alts[lang] !== loc) fail(loc, `hreflang="${lang}" points to ${alts[lang]} (must be the page itself)`);
  for (const [hl, href] of Object.entries(alts)) {
    if (!sitemapUrls.has(href)) fail(loc, `hreflang="${hl}" → ${href} is not in the sitemap`);
    if (alternates[hl] && alternates[hl] !== href) fail(loc, `hreflang="${hl}" is ${href} in the page but ${alternates[hl]} in the sitemap`);
  }

  // structured data must parse
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(loc, 'invalid JSON in application/ld+json'); }
  }
  if (/<meta[^>]*name="application\/ld\+json"/.test(head)) fail(loc, 'LD-JSON in a <meta> tag (search engines ignore it)');

  // collect internal links (<a href> only; assets are checked below)
  for (const t of tags(html, /<a\s[^>]*href="[^"]*"[^>]*>/g)) {
    let href = attr(t, 'href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    if (href.startsWith('/')) href = SITE + href;
    if (!href.startsWith(SITE + '/')) continue;
    href = href.split('#')[0];
    if (!internalLinks.has(href)) internalLinks.set(href, loc);
  }
  // images/scripts/styles referenced from the page (relative paths resolve against <base href>)
  const baseHref = new URL(html.match(/<base href="([^"]*)"/)?.[1] || path, SITE).href;
  for (const t of tags(html, /<(?:img|script|link)\s[^>]*(?:src|href)="[^"]*"[^>]*>/g)) {
    if (/rel="(canonical|alternate)"/.test(t)) continue;
    let src = attr(t, 'src') || attr(t, 'href');
    if (!src || src.startsWith('data:') || src.startsWith('http') && !src.startsWith(SITE)) continue;
    if (src.startsWith('/')) src = SITE + src;
    else if (!src.startsWith('http')) src = new URL(src, baseHref).href;
    if (!internalLinks.has(src)) internalLinks.set(src, loc);
  }
}

// hreflang must be reciprocal (en ↔ bg)
for (const [loc, alts] of pageAlternates) {
  for (const [hl, href] of Object.entries(alts)) {
    if (hl === 'x-default' || href === loc) continue;
    const back = pageAlternates.get(href);
    if (back && !Object.values(back).includes(loc)) fail(loc, `hreflang="${hl}" → ${href}, but that page does not link back`);
  }
}

// ---------- 4. Internal links: must answer 200 directly ----------
for (const [href, from] of internalLinks) {
  const r = await get(href);
  if (r.status === 200) continue;
  const isPage = !/\.[a-z0-9]+$/i.test(new URL(href).pathname);
  const msg = `${r.status}${r.location ? ` → ${r.location}` : ''} (linked from ${from})`;
  if (r.status >= 300 && r.status < 400 && isPage) fail(href, `internal link redirects: ${msg}`);
  else if (r.status >= 400) fail(href, `internal link broken: ${msg}`);
  else warn(href, msg);
}

// ---------- 5. Known redirects: one hop to a 200 page ----------
const redirects = {
  '/': '/en/',
  '/en': '/en/',
  '/bg': '/bg/',
  '/en?ref=x': '/en/?ref=x',
  '/en/home': '/en/',
  '/bg/home/': '/bg/',
  '/en/terms': '/en/terms/',
  '/en/pricing': '/en/pricing/',
  '/bg/pricing': '/bg/pricing/',
  '/pricing': '/en/pricing/',
  '/terms': '/en/terms/',
  '/en-US/pricing': '/en/pricing/',
  '/en/pricing?x=1': '/en/pricing/?x=1',
};
for (const [from, to] of Object.entries(redirects)) {
  const hops = await chain(SITE + from);
  const last = hops.at(-1);
  const summary = hops.map((h) => `${h.status} ${new URL(h.url).pathname}${new URL(h.url).search}`).join(' → ');
  if (hops.length !== 2 || hops[0].status !== 301 || last.status !== 200) fail(SITE + from, `expected one 301 then 200, got: ${summary}`);
  else if (new URL(last.url).pathname + new URL(last.url).search !== to) fail(SITE + from, `redirects to ${last.url}, expected ${to}`);
}

// ---------- 6. Unknown URL is a real 404 (not a soft 404) ----------
for (const p of ['/en/this-page-does-not-exist/', '/bg/nope/']) {
  const r = await get(SITE + p);
  if (r.status !== 404) fail(SITE + p, `unknown URL answers ${r.status} (must be 404)`);
}

// ---------- Report ----------
console.log(`\nChecked ${sitemapEntries.length} sitemap URLs, ${internalLinks.size} internal links/assets, ${Object.keys(redirects).length} redirects on ${BASE}\n`);
if (warnings.length) console.log(`Warnings (${warnings.length}):\n  ` + warnings.join('\n  ') + '\n');
if (errors.length) {
  console.log(`ERRORS (${errors.length}):\n  ` + errors.join('\n  ') + '\n');
  process.exit(1);
}
console.log('OK: no Search Console issues found.\n');
