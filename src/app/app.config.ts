import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { markedOptionsFactory } from './marked-options-factory';
import { AnchorService } from './services/anchor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}))
    ,provideHttpClient(withFetch())
    , provideClientHydration()
    ,provideMarkdown({
    loader: HttpClient,
    markedOptions: {
      provide: MARKED_OPTIONS,
      useFactory: markedOptionsFactory,
      deps: [AnchorService],
    },
    sanitize: SecurityContext.NONE,}) ]
};
