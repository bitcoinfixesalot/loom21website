import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PricingComponent } from './pricing/pricing.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FaqComponent } from './faq/faq.component';
import { RoadmapComponent } from './roadmap/roadmap.component';

// docs and terms are lazy: they bring ngx-markdown + marked, which no other page needs
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'docs', loadChildren: () => import('./documentation/documentation.routes') },
    // { path: 'blog', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'roadmap', component: RoadmapComponent },
    { path: '404', component : NotFoundComponent},
    { path: 'privacy-policy', component: PrivacyComponent },
    { path: 'terms', loadChildren: () => import('./terms/terms.routes') },
    { path: '**', redirectTo: '/404', pathMatch: 'full'}
];
