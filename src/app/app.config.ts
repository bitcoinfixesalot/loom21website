import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)
    ,provideHttpClient()
    , provideClientHydration()
    ,provideMarkdown({
    loader: HttpClient,sanitize: SecurityContext.NONE,}) ]
};
