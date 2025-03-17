import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BITCOIN_PAYMENTS, DELIVERY_MANAGEMENT, DESCRIPTIONS, INVENTORY_MANAGEMENT, LD_JSON, PAYMENT_PROCESSING, SALES_TRACKING } from '../constants/localized-const';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(@Inject(LOCALE_ID) protected localeId: string,private titleService: Title, private metaService: Meta){
    //this.titleService.setTitle("Loom 21");
  }

  ngOnInit() {
    this.titleService.setTitle('Loom 21');
    this.metaService.updateTag({
      name: 'description',
      content: DESCRIPTIONS.home_description//'Reset your password to manage inventory, payments, and Bitcoin conversions.'
    });
    this.metaService.addTag({
      name: 'application/ld+json',
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Loom 21',
        'description': LD_JSON.home_description,
        'url': `https://loom21.com/${this.localeId}/`,
        'applicationCategory': 'BusinessApplication',
        'featureList': [SALES_TRACKING, DELIVERY_MANAGEMENT, PAYMENT_PROCESSING, INVENTORY_MANAGEMENT, BITCOIN_PAYMENTS]
      })
    });
  }
}
