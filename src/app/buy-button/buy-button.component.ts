import { ChangeDetectionStrategy, Component, Inject, isDevMode, LOCALE_ID, OnDestroy, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BREADCRUMBS, DESCRIPTIONS, TITLES } from '../constants/localized-const';
import {
  BUY_BUTTON_BENEFITS, BUY_BUTTON_CONSTANTS, BUY_BUTTON_FAQ, BUY_BUTTON_GITHUB_URL, BUY_BUTTON_METHODS,
  BUY_BUTTON_PLATFORMS, BUY_BUTTON_SNIPPET, BUY_BUTTON_STEPS, BUY_BUTTON_UTM
} from '../constants/buy-button-const';
import { OgMetaService } from '../services/og-meta.service';
import { StructuredDataService } from '../services/structured-data.service';
import { RevealDirective } from '../shared/reveal.directive';

type CopyState = 'idle' | 'copied' | 'failed';

@Component({
  selector: 'app-buy-button',
  imports: [RevealDirective],
  templateUrl: './buy-button.component.html',
  styleUrl: './buy-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyButtonComponent implements OnInit, OnDestroy {
  readonly CONSTANTS = BUY_BUTTON_CONSTANTS;
  readonly snippet = BUY_BUTTON_SNIPPET;
  readonly githubUrl = BUY_BUTTON_GITHUB_URL;
  readonly steps = BUY_BUTTON_STEPS;
  readonly methods = BUY_BUTTON_METHODS;
  readonly benefits = BUY_BUTTON_BENEFITS;
  readonly platforms = BUY_BUTTON_PLATFORMS;
  readonly faq = BUY_BUTTON_FAQ;
  readonly signupUrl: string;
  readonly copyState = signal<CopyState>('idle');
  private resetTimer?: ReturnType<typeof setTimeout>;

  constructor(private titleService: Title, private metaService: Meta, private ogMetaService: OgMetaService, private structuredDataService: StructuredDataService, @Inject(LOCALE_ID) private localeId: string) {
    // Same app base as the pricing page's Free plan button, plus campaign tags for this page
    const base = isDevMode() ? 'https://localhost:44412/' : `https://app.loom21.com/${this.localeId === 'bg' ? 'bg' : 'en'}/`;
    this.signupUrl = `${base}signup/?${BUY_BUTTON_UTM}`;
  }

  ngOnInit(): void {
    this.titleService.setTitle(TITLES.buyButton);
    this.setMetaTags();
  }

  ngOnDestroy(): void {
    clearTimeout(this.resetTimer);
  }

  // Only ever runs on a click, so it is browser-only by nature
  async copySnippet(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.snippet);
      this.copyState.set('copied');
    } catch {
      this.copyState.set('failed');
    }
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.copyState.set('idle'), 2500);
  }

  private setMetaTags(): void {
    this.metaService.updateTag({ name: 'description', content: DESCRIPTIONS.buy_button_description });
    this.ogMetaService.setOgTags({ title: TITLES.buyButton, description: DESCRIPTIONS.buy_button_description });

    this.structuredDataService.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': this.faq.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
        }))
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': BREADCRUMBS.home, 'item': `https://loom21.com/${this.localeId}/` },
          { '@type': 'ListItem', 'position': 2, 'name': BREADCRUMBS.buyButton, 'item': `https://loom21.com/${this.localeId}/buy-button/` }
        ]
      }
    ]);
  }
}
