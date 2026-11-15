import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Only the home page is in the initial bundle. Every other page is loaded on demand, so its
// code and text (forms on contact and pricing, the FAQ and privacy copy) do not slow the first visit.
// docs and terms also bring ngx-markdown + marked, which no other page needs.
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'docs', loadChildren: () => import('./documentation/documentation.routes') },
    { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
    { path: 'pricing', loadComponent: () => import('./pricing/pricing.component').then(m => m.PricingComponent) },
    { path: 'faq', loadComponent: () => import('./faq/faq.component').then(m => m.FaqComponent) },
    { path: 'roadmap', loadComponent: () => import('./roadmap/roadmap.component').then(m => m.RoadmapComponent) },
    { path: '404', loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent) },
    { path: 'privacy-policy', loadComponent: () => import('./privacy/privacy.component').then(m => m.PrivacyComponent) },
    { path: 'terms', loadChildren: () => import('./terms/terms.routes') },
    // Unknown URLs show the 404 page in place (the address stays, the server answers 404) instead of redirecting
    { path: '**', loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent) }
];
