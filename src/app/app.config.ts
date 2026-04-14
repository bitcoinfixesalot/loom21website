import { ApplicationConfig, provideZonelessChangeDetection, SecurityContext } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { MARKED_OPTIONS, provideMarkdown, SANITIZE } from 'ngx-markdown';
import { markedOptionsFactory } from './marked-options-factory';
import { AnchorService } from './services/anchor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection()
    ,provideRouter(routes, withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}))
    ,provideHttpClient(withFetch())
    , provideClientHydration()
    ,provideMarkdown({
    loader: HttpClient,
    markedOptions: {
      provide: MARKED_OPTIONS,
      useFactory: markedOptionsFactory,
      deps: [AnchorService],
    },
    sanitize: { provide: SANITIZE, useValue: SecurityContext.NONE },}) ]
};
