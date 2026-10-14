import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { LocationStrategy, TrailingSlashPathLocationStrategy } from '@angular/common';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Markdown (ngx-markdown) is provided on the lazy docs/terms routes: see markdown-providers.ts
export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection()
    ,provideRouter(routes, withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}))
    // Keep the trailing slash the server enforces; the default strategy strips it on load,
    // which Google reports as a JS redirect ("Page with redirect").
    ,{ provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy }
    ,provideHttpClient(withFetch())
    , provideClientHydration() ]
};
