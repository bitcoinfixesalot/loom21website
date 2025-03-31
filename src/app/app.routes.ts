import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PricingComponent } from './pricing/pricing.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'docs', component: DocumentationComponent },
    { path: 'blog', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'pricing', component: PricingComponent },
    { path: '404', component : NotFoundComponent},
    { path: '**', redirectTo: '/404', pathMatch: 'full'}
];
