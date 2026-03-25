# Loom21 Website

Angular 19 static website with Server-Side Rendering (SSR) and multi-language support (English & Bulgarian).

## Tech Stack

- Angular 19.2.14 with TypeScript 5.8.3
- Express SSR server
- ngx-markdown for documentation pages
- PrismJS (syntax highlighting), KaTeX (math equations)
- SCSS styling with Font Awesome icons

## Project Structure

```
src/app/
├── banner/          # Navigation banner component
├── footer/          # Footer component
├── home/            # Home page
├── contact/         # Contact page with email integration
├── documentation/   # Markdown-based docs
├── pricing/         # Pricing page
├── privacy/         # Privacy policy
├── not-found/       # 404 page
├── services/        # Shared services
└── constants/       # Localized content (en/bg)
```

## Commands

- `npm start` - Development server
- `npm run build` - Production build with SSR
- `npm test` - Run unit tests
- `npm run serve:ssr` - Serve SSR build locally

## Key Files

- `angular.json` - Angular CLI config, i18n locales (en/bg)
- `server.ts` - Express SSR configuration for multi-language routing
- `src/locale/` - Bulgarian translations

## Notes

- Multi-language routing: default is English, `/bg/` prefix for Bulgarian
- Contact form has honeypot + minimum submission time protection
- Canonical URLs and hreflang tags for SEO
