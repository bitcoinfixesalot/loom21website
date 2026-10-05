import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PricingComponent } from './pricing/pricing.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FaqComponent } from './faq/faq.component';
import { RoadmapComponent } from './roadmap/roadmap.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'docs', component: DocumentationComponent },
    // { path: 'blog', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'roadmap', component: RoadmapComponent },
    { path: '404', component : NotFoundComponent},
    { path: 'privacy-policy', component: PrivacyComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full'}
];
