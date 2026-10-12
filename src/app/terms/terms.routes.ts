import { Routes } from '@angular/router';
import { markdownProviders } from '../markdown-providers';
import { TermsComponent } from './terms.component';

export default [
  { path: '', component: TermsComponent, providers: [markdownProviders] },
] satisfies Routes;
