# Loom21 Website

Angular 21 marketing website with Server-Side Rendering (SSR) and multi-language support (English & Bulgarian).

## Tech Stack

- Angular 21.2.8 with TypeScript ~5.9.3
- Express SSR server with prerendering enabled
- ngx-markdown for documentation and terms pages (docs load from external GitHub repo at runtime). Both routes are lazy (`loadChildren`) and get `markdownProviders` (`src/app/markdown-providers.ts`), so markdown code stays out of the main bundle
- No PrismJS / KaTeX / emoji-toolkit: the docs use no code blocks or math. Emoji shortcodes (`:bell:`) are mapped in `src/app/marked-emoji-extension.ts` — add an entry there when the docs use a new one. If code highlighting or math is ever needed, load it only on the docs route (angular.json `"inject": false` + `bundleName`), never globally
- SCSS styling, Bootstrap 5 (CDN), Font Awesome icons
- Zoneless change detection (`provideZonelessChangeDetection()`)
- `ChangeDetectionStrategy.OnPush` on all components

## Project Structure

```
src/app/
├── banner/          # Navigation banner component
├── footer/          # Footer component
├── home/            # Home page
├── contact/         # Contact page with email integration
├── documentation/   # Markdown-based docs (loaded from GitHub at runtime)
├── pricing/         # Pricing page (fetches plans from API)
├── privacy/         # Privacy policy
├── faq/             # FAQ page (FAQPage structured data)
├── roadmap/         # Roadmap page (Shipped / In Progress / Planned)
├── terms/           # Terms of Service (markdown in terms/content/terms.{en,bg}.md, imported as text)
├── not-found/       # 404 page
├── shared/          # Shared components (protected-email: click-to-reveal contact email; reveal.directive: scroll reveal)
├── services/        # Shared services (see below)
└── constants/       # Localized content (en/bg)
    ├── localized-const.ts   # TITLES, DESCRIPTIONS, TAGS, LD_JSON constants
    ├── privacy-policy-const.ts
    ├── faq-const.ts
    ├── roadmap-const.ts
    ├── pricing-const.ts     # Tiers, prices (source of truth for display), comparison rows, pricing FAQ
    ├── product-const.ts     # API_STATUS flag
    └── contact-const.ts     # Contact email, kept in parts (see Notes)
scripts/
├── generate-sitemap.js  # Auto-generates src/sitemap.xml (run via prebuild)
└── optimize-images.js   # Makes resized WebP copies of home page images (run manually, needs sharp)
```

### Services

| Service | Purpose |
|---|---|
| `canonical.service.ts` | Sets canonical URL and hreflang link tags on each `NavigationEnd` |
| `og-meta.service.ts` | Sets Open Graph and Twitter Card meta tags per page |
| `structured-data.service.ts` | Injects `<script type="application/ld+json">` elements into `<head>` (remove-then-create, like `canonical.service.ts`) |
| `anchor.service.ts` | Intercepts anchor clicks for smooth in-page scrolling |
| `email.service.ts` | Sends contact form emails |
| `subscription-plan.service.ts` | Fetches pricing plans from the app API |
| `language.service.ts` | Language detection/switching helpers |

## Commands

- `npm start` - Development server
- `npm run build` - Production build with SSR (runs `prebuild` → sitemap generation first)
- `npm test` - Run unit tests
- `npm run serve:ssr:loom21website` - Serve SSR build locally
- `npm run dev-en:ssr` - Dev SSR server for English
- `npm run dev-bg:ssr` - Dev SSR server for Bulgarian
- `node scripts/generate-sitemap.js` - Regenerate sitemap manually
- `node scripts/optimize-images.js` - Regenerate WebP images after replacing a source PNG (originals are kept; `loom-app-laptop-mobile.png` is also the OG image)

## Key Files

- `angular.json` - Angular CLI config, i18n locales (en/bg), prerender enabled
- `server.ts` - Express SSR configuration for multi-language routing
- `src/proxy-server.mjs` - Production entry (copied to `dist/` by `copy-proxy-server.js`, run by the Dockerfile): mounts `/en` and `/bg`, redirects, and gzip/Brotli via `compression`. Runtime packages are installed in the Dockerfile (`npm install express compression`), so add any new runtime import there too
- `src/locale/` - Bulgarian translations (XLF format)
- `src/sitemap.xml` - Auto-generated on build (do not edit manually)
- `src/robots.txt` - Allows /en/ and /bg/, references sitemap
- `src/styles.scss` - Design tokens, Bootstrap colour overrides, `.ui-card`, scroll-reveal and reduced-motion rules (see Design System)
- `src/index.html` - Bootstrap 5 bundle (includes Popper v2), Montserrat font `<link>` (inlined at build), Simple Analytics. Material Icons is not loaded — use Font Awesome 4.7 (`fa fa-*`)

## Design System

- **Brand colour** is defined once: `$brand`, `$brand-dark`, `$brand-tint` in `src/assets/scss/variable.scss`. The theme's `$primary`, `$themecolor`, `$success` and `$info` all point at it, so `btn-primary` and `btn-success` are the same purple
- **Tokens** are CSS custom properties on `:root` in `src/styles.scss`: `--brand`, `--brand-dark`, `--brand-tint`, `--brand-rgb` (for `rgba(var(--brand-rgb), 0.2)`), `--ink`, `--heading`, `--text`, `--text-muted`, `--border`, `--surface`, `--surface-alt`, `--radius-card`, `--radius-lg`, `--shadow-card*`, `--header-h`. Use these in component styles; do not hardcode hex colours, radii or shadows
- `src/styles.scss` also overrides the Bootstrap CDN's hardcoded blue (links, `.border-primary`, focus rings, accordion)
- **Cards**: use the global `.ui-card` (plus `.ui-card--compact`, `.ui-card--lift`) for raised cards; a page stylesheet only adds what is specific to that card. Tinted panels use `--brand-tint` with `--radius-card`. Tinted full-width sections use `.section-tint`
- **Buttons**: one filled button per group for the main action (`btn-success` / `btn-primary`), `btn-outline-primary` for the rest (e.g. only the highlighted pricing plan is filled)
- **Scroll reveal**: add `appReveal` (or `appReveal="80"` for a delay in ms) and import `RevealDirective`. It hides an element only in the browser and only if it starts below the viewport, so prerendered HTML stays fully visible. AOS and Waves are not loaded; do not add `data-aos` or `waves-effect`
- **Reduced motion**: a global rule in `src/styles.scss` disables animations, transitions and smooth scrolling under `prefers-reduced-motion: reduce`
- **Header** is sticky (`:host` in `banner.component.scss`). `--header-h` offsets in-page anchors (`scroll-padding-top`) and the docs sidebar. The "back to top" target is `<span id="top">` in `app.component.html`, not the header. The nav collapses to the menu button below 1200px (`navbar-expand-xl`): six links do not fit on one line below that, especially in Bulgarian. The mobile menu is closed on `NavigationEnd`
- **Home video**: the YouTube embed ignores taps in browser phone emulation, so Pause/Play and Replay buttons under the video control it through `postMessage` (`enablejsapi=1`)
- Component style budget is 4 kB warning / 10 kB error (`angular.json`); the home page stylesheet is about 7.6 kB

## SEO Architecture

All SEO meta is set dynamically in each page component's `ngOnInit`:

1. **Title** — via `Title` service
2. **Description** — via `Meta.updateTag({ name: 'description', ... })`
3. **Open Graph + Twitter Cards** — via `OgMetaService.setOgTags({ title, description })`
4. **LD-JSON structured data** — via `StructuredDataService.setJsonLd([...])` (injects real `<script type="application/ld+json">` elements into `<head>`; **do not** use `Meta.addTag`/`updateTag` with `name: 'application/ld+json'` — Angular's `Meta` service only ever creates `<meta>` tags, which search engines do not parse as structured data)
5. **BreadcrumbList** — second LD-JSON block on all inner pages (contact, pricing, docs, privacy, faq, roadmap)
6. **Canonical URL + hreflang** — via `CanonicalService` (triggered on every `NavigationEnd` in `AppComponent`)
7. **`html[lang]`** — set in `AppComponent` constructor from `LOCALE_ID` (en → `lang="en"`, bg → `lang="bg"`)

### Structured data by page

| Page | Schemas |
|---|---|
| Home | `SoftwareApplication` |
| Pricing | `Product` with `Offer` array, `BreadcrumbList` |
| Contact | `ContactPage`, `BreadcrumbList` |
| Documentation | `WebPage`, `BreadcrumbList` |
| Privacy | `WebPage`, `BreadcrumbList` |
| FAQ | `FAQPage`, `BreadcrumbList` |
| Roadmap | `WebPage`, `BreadcrumbList` |
| Terms | `WebPage`, `BreadcrumbList` |

### OG image

Default: `https://loom21.com/en/assets/images/form-banners/loom-app-laptop-mobile.png`

## Notes

- Multi-language routing: default is English (`/en/`), `/bg/` prefix for Bulgarian
- Contact form has honeypot field + minimum 3-second submission time (bot protection)
- **Never put the contact address (`contact-const.ts`) as plain text in templates or content.** Use `<app-protected-email />` (click to reveal) or the `[[EMAIL]]` token in Terms markdown (prerender shows `info [at] loom21 [dot] com`; the browser swaps in a mailto link). Check after a build: `grep -rl "info@loom21[.]com" dist/loom21website/browser/ --include=*.html` → nothing
- Terms text lives in `src/app/terms/content/*.md` (`.md` is loaded as text via `loader` in `angular.json`). `terms.bg.md` is the English text with a notice until the BG translation exists
- Pricing page renders from `pricing-const.ts`; the app API only supplies checkout ids and is fetched in the browser only (never during prerender)
- `src/sitemap.xml` is auto-generated by `scripts/generate-sitemap.js` — `lastmod` updates to today on every build. To add a new page, edit the `mainPages` array in that script, then add OG tags + LD-JSON + breadcrumb in the new component (see SEO Architecture above)
- Documentation markdown is fetched at runtime from `https://raw.githubusercontent.com/loom21/loom21doc/main/README.md` (BG: `README-bg.md`). A shimmer skeleton is shown while loading; on fetch failure an error state with Retry and a GitHub link is shown
- Focus outlines use `:focus-visible` — keyboard users see a blue ring, mouse users do not
- Bootstrap 5 bundle (includes Popper v2) is used — jQuery is not loaded
- Roadmap page content (`roadmap-const.ts`) is draft copy inferred from existing product signals, not confirmed business commitments — review with the team before treating "In Progress"/"Planned" items as accurate

- After changing template text, run `npx ng extract-i18n --output-path src/locale`, add the Bulgarian `<target>` to `messages.bg.xlf`, then `npm run i18n:check`
- `npm run build` rewrites `src/sitemap.xml` (`lastmod`); restore it with `git checkout -- src/sitemap.xml` if the build was only a check

## Remaining Improvements

Low-priority items not yet implemented:

- [x] WebP images on the home page (`srcset`/`sizes`, generated by `scripts/optimize-images.js`)
- [x] Error state for documentation page if GitHub fetch fails (`(error)` on `<markdown>`)
- [ ] `console.log` / `console.error` calls should be removed from production components (pricing, contact)
- [ ] Service worker / PWA for offline caching
