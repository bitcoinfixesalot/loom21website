import { ChangeDetectionStrategy, Component, ElementRef, Inject, isDevMode, LOCALE_ID, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
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
import { API_STATUS } from '../constants/product-const';
import { RevealDirective } from '../shared/reveal.directive';
import { OgMetaService } from '../services/og-meta.service';
import { StructuredDataService } from '../services/structured-data.service';

// The Loom21 promo video on YouTube (https://youtube.com/watch?v=<id>)
const PROMO_VIDEO_ID = 'i5AcWrVMqxQ';
const PROMO_VIDEO_ORIGIN = 'https://www.youtube-nocookie.com';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  appUrl: string;
  isVideoPlaying = false;
  readonly isVideoPaused = signal(false);
  private readonly promoFrame = viewChild<ElementRef<HTMLIFrameElement>>('promoFrame');
  promoVideoUrl: SafeResourceUrl;
  readonly apiStatus = API_STATUS;
  readonly integrationsCardText = API_STATUS === 'live'
    ? $localize`:Stat integrations desc (API live)@@statIntegrationsDescLive:Connect your ERP, CRM or custom apps through the Loom21 API.`
    : $localize`:Stat integrations desc (API soon)@@statIntegrationsDescSoon:Stripe, BTCPay Server, Glow, Speed Wallet and LNbits today; open API coming soon.`;

  constructor(@Inject(LOCALE_ID) protected localeId: string, private titleService: Title, private metaService: Meta, private ogMetaService: OgMetaService, private structuredDataService: StructuredDataService, private sanitizer: DomSanitizer) {
    this.appUrl = 'https://app.loom21.com/';
    if (isDevMode()) {
      this.appUrl = 'https://localhost:44412/'
    }
    if (this.localeId == 'bg') {
      this.appUrl = 'https://app.loom21.com/bg/'
    }
    // enablejsapi lets the Pause/Replay buttons under the video control the player (see postToPlayer)
    this.promoVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${PROMO_VIDEO_ORIGIN}/embed/${PROMO_VIDEO_ID}?autoplay=1&enablejsapi=1&playsinline=1`);
  }

  playPromoVideo(): void {
    this.isVideoPlaying = true;
    this.isVideoPaused.set(false);
    window.addEventListener('message', this.onPlayerMessage);
  }

  /** Ask the player to report state changes, so the button also follows YouTube's own controls. */
  onPromoFrameLoad(): void {
    this.postToPlayer({ event: 'listening', id: 'promo', channel: 'widget' });
  }

  togglePromoVideo(): void {
    const paused = this.isVideoPaused();
    this.playerCommand(paused ? 'playVideo' : 'pauseVideo');
    this.isVideoPaused.set(!paused);
  }

  replayPromoVideo(): void {
    this.playerCommand('seekTo', [0, true]);
    this.playerCommand('playVideo');
    this.isVideoPaused.set(false);
  }

  ngOnDestroy(): void {
    if (this.isVideoPlaying) {
      window.removeEventListener('message', this.onPlayerMessage);
    }
  }

  private playerCommand(func: string, args: unknown[] = []): void {
    this.postToPlayer({ event: 'listening', id: 'promo', channel: 'widget' });
    this.postToPlayer({ event: 'command', func, args });
  }

  // The YouTube embed takes commands as postMessage JSON. Its own touch controls can be unresponsive
  // (seen in browser phone emulation), so the page's buttons must not depend on them.
  private postToPlayer(message: object): void {
    this.promoFrame()?.nativeElement.contentWindow?.postMessage(JSON.stringify(message), PROMO_VIDEO_ORIGIN);
  }

  private readonly onPlayerMessage = (event: MessageEvent): void => {
    if (event.origin !== PROMO_VIDEO_ORIGIN || typeof event.data !== 'string') {
      return;
    }
    try {
      const state = JSON.parse(event.data)?.info?.playerState;
      // 1 playing, 2 paused, 0 ended
      if (state === 1) {
        this.isVideoPaused.set(false);
      } else if (state === 2 || state === 0) {
        this.isVideoPaused.set(true);
      }
    } catch {
      // not a player message
    }
  };

  ngOnInit() {
    this.titleService.setTitle(TITLES.home_title);
    this.metaService.updateTag({
      name: 'description',
      content: DESCRIPTIONS.home_description
    });
    this.ogMetaService.setOgTags({ title: TITLES.home_title, description: DESCRIPTIONS.home_description });

    this.structuredDataService.setJsonLd([{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Loom21",
      "description": LD_JSON.home_description,
      "applicationCategory": "BusinessApplication",
      "featureList": [INVENTORY_MANAGEMENT, STOCK_CONTROL, PRODUCT_MANAGEMENT, INVOICE_PROCESSING, CUSTOMER_MANAGEMENT, SUPPLIER_MANAGEMENT,
        VENDOR_MANAGEMENT, ORDER_FULFILLMENT, PAYMENT_PROCESSING, BITCOIN_PAYMENTS, SALES_TRACKING, SERVICE_MANAGEMENT, DELIVERY_MANAGEMENT,
        USER_ROLES_PERMISSIONS, INVENTORY_ANALYTICS, WAREHOUSE_MANAGEMENT, REAL_TIME_INVENTORY_TRACKING, PRICE_LIST_MANAGEMENT, CUSTOM_FIELDS_MANAGEMENT
      ],
      "operatingSystem": "Web",
      "offers": { "@type": "AggregateOffer", "lowPrice": "0", "highPrice": "179", "priceCurrency": "EUR", "offerCount": 4 },
      "url": `https://loom21.com/${this.localeId}`,
      "publisher": {
        "@type": "Organization",
        "name": "Loom21",
        "url": "https://loom21.com",
        "sameAs": ["https://x.com/loom21app", "https://github.com/loom21/loom21doc"]
      },
      "datePublished": "2025-03-17",
      "inLanguage": this.localeId === 'bg' ? 'bg-BG' : 'en-US'
    }]);
  }
}
