import { ChangeDetectionStrategy, Component, computed, Inject, isDevMode, LOCALE_ID, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { first } from 'rxjs';
import { SubscriptionPlanService, SubscriptionType } from '../services/subscription-plan.service';
import { DESCRIPTIONS, LD_JSON, TITLES } from '../constants/localized-const';
import {
  ANNUAL_BADGE, BITCOIN_BADGE, BillingMode, COMPARE_ROWS, CompareValue, PRICING_FAQ, TIER_BY_API_TYPE, TIER_PRICES, TIERS, TierKey
} from '../constants/pricing-const';
import { OgMetaService } from '../services/og-meta.service';
import { StructuredDataService } from '../services/structured-data.service';

export interface PricingCard {
  key: TierKey;
  name: string;
  tagline: string;
  highlight?: boolean;
  bullets: string[];
  cta: string;
  price: number;    // cents per month for the selected billing mode
  btcPrice: number; // cents per month when paying in Bitcoin
  apiId?: number;   // checkout plan id from the app API, when available
}

@Component({
  selector: 'app-pricing',
  imports: [FormsModule, RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingComponent implements OnInit {
  readonly ANNUAL_BADGE = ANNUAL_BADGE;
  readonly BITCOIN_BADGE = BITCOIN_BADGE;
  readonly TIERS = TIERS;
  readonly COMPARE_ROWS = COMPARE_ROWS;
  readonly PRICING_FAQ = PRICING_FAQ;

  billing = signal<BillingMode>('year');
  apiPlans = signal<SubscriptionType[]>([]);
  checkoutUnavailable = signal(false);

  cards = computed<PricingCard[]>(() => {
    const billing = this.billing();
    const plans = this.apiPlans();
    return TIERS.map(tier => ({
      ...tier,
      price: TIER_PRICES[tier.key][billing],
      btcPrice: TIER_PRICES[tier.key].bitcoin,
      apiId: plans.find(p => TIER_BY_API_TYPE[p.type] === tier.key && p.interval === billing)?.id,
    }));
  });

  // TODO(design): pass a 1200×630 pricing card as `image` to setOgTags once it exists.
  constructor(@Inject(LOCALE_ID) protected localeId: string,
    private subscriptionPlan: SubscriptionPlanService,
    private titleService: Title,
    private metaService: Meta,
    private ogMetaService: OgMetaService,
    private structuredDataService: StructuredDataService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(TITLES.pricing);
    this.metaService.updateTag({ name: 'description', content: DESCRIPTIONS.pricing_description });
    this.ogMetaService.setOgTags({ title: TITLES.pricing, description: DESCRIPTIONS.pricing_description });
    this.updateStructuredData();
    this.loadPlans();
  }

  /** The page renders from constants; the API only supplies checkout ids. */
  private loadPlans(): void {
    this.subscriptionPlan.getAvailablePlans().pipe(first()).subscribe({
      next: plans => {
        this.apiPlans.set(plans);
        if (isDevMode()) {
          this.warnOnPriceDrift(plans);
        }
      },
      error: () => this.checkoutUnavailable.set(true)
    });
  }

  private warnOnPriceDrift(plans: SubscriptionType[]): void {
    for (const p of plans) {
      const tier = TIER_BY_API_TYPE[p.type];
      const mode = p.interval as BillingMode;
      if (tier && mode in TIER_PRICES[tier] && TIER_PRICES[tier][mode] !== p.amount) {
        console.warn(`Pricing drift: ${tier}/${mode} API=${p.amount} constants=${TIER_PRICES[tier][mode]}`);
      }
    }
  }

  formatPrice(cents: number): string {
    const whole = cents % 100 === 0;
    return new Intl.NumberFormat(this.localeId === 'bg' ? 'bg-BG' : 'en-IE', {
      style: 'currency', currency: 'EUR',
      minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2,
    }).format(cents / 100);
  }

  periodLabel(key: TierKey): string {
    if (key === 'free') return $localize`:Forever@@pricingForever:forever`;
    return this.billing() === 'month'
      ? $localize`:Per month@@perMonth:per month`
      : $localize`:Billed annually@@billedAnnually:per month (billed annually)`;
  }

  compareValue(value: CompareValue): string {
    if (typeof value === 'number') {
      // bg-BG would print 1000 but 25 000; always group thousands to match the card bullets (1 000 / 1,000).
      const en = new Intl.NumberFormat('en-IE').format(value);
      return this.localeId === 'bg' ? en.replace(/,/g, ' ') : en;
    }
    return typeof value === 'string' ? value : '';
  }

  private appBase(): string {
    if (isDevMode()) return 'https://localhost:44412/';
    return this.localeId === 'bg' ? 'https://app.loom21.com/bg/' : 'https://app.loom21.com/en-US/';
  }

  onSelect(card: PricingCard): void {
    const base = this.appBase();
    const url = card.key === 'free' || !card.apiId ? `${base}signup/` : `${base}plans/${card.apiId}`;
    window.open(url, '_blank', 'noopener');
  }

  private updateStructuredData(): void {
    const product = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Loom21',
      description: LD_JSON.pricing_description,
      // Monthly list prices, so the offers don't depend on the selected billing toggle.
      offers: TIERS.map(t => ({
        '@type': 'Offer',
        name: t.name,
        price: (TIER_PRICES[t.key].month / 100).toFixed(2),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `https://loom21.com/${this.localeId}/pricing/#plan-${t.key}`,
      })),
    };
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `https://loom21.com/${this.localeId}/` },
        { '@type': 'ListItem', 'position': 2, 'name': 'Pricing', 'item': `https://loom21.com/${this.localeId}/pricing/` }
      ]
    };
    this.structuredDataService.setJsonLd([breadcrumb, product]);
  }
}
