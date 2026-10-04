import { ChangeDetectionStrategy, Component, Inject, isDevMode, LOCALE_ID, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import {
  BITCOIN_PAYMENTS,
  CUSTOM_FIELDS_MANAGEMENT,
  CUSTOMER_MANAGEMENT,
  DELIVERY_MANAGEMENT,
  DESCRIPTIONS,
  INVENTORY_ANALYTICS,
  INVENTORY_MANAGEMENT,
  INVOICE_PROCESSING,
  LD_JSON,
  ORDER_FULFILLMENT,
  PAYMENT_PROCESSING,
  PRICE_LIST_MANAGEMENT,
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
import { OgMetaService } from '../services/og-meta.service';

// TODO: replace with the real Loom21 promo video ID once available (see https://youtube.com/watch?v=<id>)
const PROMO_VIDEO_ID = 'IlMuVoSU0Po';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  appUrl: string;
  isVideoPlaying = false;
  promoVideoUrl: SafeResourceUrl;

  constructor(@Inject(LOCALE_ID) protected localeId: string, private titleService: Title, private metaService: Meta, private ogMetaService: OgMetaService, private sanitizer: DomSanitizer) {
    this.appUrl = 'https://app.loom21.com/';
    if (isDevMode()) {
      this.appUrl = 'https://localhost:44412/'
    }
    if (this.localeId == 'bg') {
      this.appUrl = 'https://app.loom21.com/bg/'
    }
    this.promoVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${PROMO_VIDEO_ID}?autoplay=1`);
  }

  playPromoVideo(): void {
    this.isVideoPlaying = true;
  }

  ngOnInit() {
    this.titleService.setTitle(TITLES.home_title);
    this.metaService.updateTag({
      name: 'description',
      content: DESCRIPTIONS.home_description
    });
    this.ogMetaService.setOgTags({ title: TITLES.home_title, description: DESCRIPTIONS.home_description });

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
          USER_ROLES_PERMISSIONS, INVENTORY_ANALYTICS, WAREHOUSE_MANAGEMENT, REAL_TIME_INVENTORY_TRACKING, PRICE_LIST_MANAGEMENT, CUSTOM_FIELDS_MANAGEMENT
        ],
        "operatingSystem": "Web, iOS, Android",
        "url": `https://loom21.com/${this.localeId}`,
        "publisher": {
          "@type": "Organization",
          "name": "Loom 21"
        },
        "datePublished": "2025-03-17",
        "inLanguage": this.localeId === 'bg' ? 'bg-BG' : 'en-US'
      })
    });
  }
}
