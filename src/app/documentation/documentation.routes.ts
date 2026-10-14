import { Routes } from '@angular/router';
import { markdownProviders } from '../markdown-providers';
import { DocumentationComponent } from './documentation.component';

export default [
  { path: '', component: DocumentationComponent, providers: [markdownProviders] },
] satisfies Routes;
