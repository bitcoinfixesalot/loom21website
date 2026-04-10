import { ChangeDetectionStrategy, Component, Inject, isDevMode, LOCALE_ID, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {
  BITCOIN_PAYMENTS,
  CUSTOMER_MANAGEMENT,
  DELIVERY_MANAGEMENT,
  DESCRIPTIONS,
  INVENTORY_ANALYTICS,
  INVENTORY_MANAGEMENT,
  INVOICE_PROCESSING,
  LD_JSON,
  ORDER_FULFILLMENT,
  PAYMENT_PROCESSING,
  PRODUCT_MANAGEMENT,
  REAL_TIME_INVENTORY_TRACKING,
  SALES_TRACKING,
  SERVICE_MANAGEMENT,
  STOCK_CONTROL,
  SUPPLIER_MANAGEMENT,
  TITLES,
  USER_ROLES_PERMISSIONS,
  VENDOR_MANAGEMENT,
  WAREHOUSE_MANAGEMENT
} from '../constants/localized-const';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  appUrl: string;

  constructor(@Inject(LOCALE_ID) protected localeId: string, private titleService: Title, private metaService: Meta) {
    this.appUrl = 'https://app.loom21.com/';
    if (isDevMode()) {
      this.appUrl = 'https://localhost:44412/'
    }
    if (this.localeId == 'bg') {
      this.appUrl = 'https://app.loom21.com/bg/'
    }
  }

  ngOnInit() {
    this.titleService.setTitle(TITLES.home_title);
    this.metaService.updateTag({
      name: 'description',
      content: DESCRIPTIONS.home_description
    });

    this.metaService.addTag({
      name: "application/ld+json",
      content: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Loom 21",
        "description": LD_JSON.home_description,
        "applicationCategory": "BusinessApplication",
        "featureList": [INVENTORY_MANAGEMENT, STOCK_CONTROL, PRODUCT_MANAGEMENT, INVOICE_PROCESSING, CUSTOMER_MANAGEMENT, SUPPLIER_MANAGEMENT,
          VENDOR_MANAGEMENT, ORDER_FULFILLMENT, PAYMENT_PROCESSING, BITCOIN_PAYMENTS, SALES_TRACKING, SERVICE_MANAGEMENT, DELIVERY_MANAGEMENT,
          USER_ROLES_PERMISSIONS, INVENTORY_ANALYTICS, WAREHOUSE_MANAGEMENT, REAL_TIME_INVENTORY_TRACKING
        ],
        "operatingSystem": "Web, iOS, Android",
        "url": `https://loom21.com/${this.localeId}`,
        "publisher": {
          "@type": "Organization",
          "name": "Loom 21"
        },
        "datePublished": "2025-03-17",
        "inLanguage": "en-US"
      })
    });
  }
}
