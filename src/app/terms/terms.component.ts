import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TERMS_CONSTANTS } from '../constants/terms-const';
import { DESCRIPTIONS, LD_JSON, TITLES } from '../constants/localized-const';
import { OgMetaService } from '../services/og-meta.service';
import { StructuredDataService } from '../services/structured-data.service';

// TODO(legal): link in footer + add to generate-sitemap.js after approval, and drop the noindex tag.
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsComponent implements OnInit, OnDestroy {
  CONSTANTS = TERMS_CONSTANTS;

  constructor(private titleService: Title,
    private metaService: Meta,
    private ogMetaService: OgMetaService,
    private structuredDataService: StructuredDataService,
    @Inject(LOCALE_ID) private localeId: string) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(TITLES.terms);
    this.metaService.updateTag({ name: 'robots', content: 'noindex' });
    this.metaService.updateTag({ name: 'description', content: DESCRIPTIONS.terms_description });
    this.ogMetaService.setOgTags({ title: TITLES.terms, description: DESCRIPTIONS.terms_description });
    this.structuredDataService.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': TITLES.terms,
        'description': LD_JSON.terms_description,
        'isPartOf': { '@type': 'WebSite', 'name': 'Loom21', 'url': 'https://loom21.com' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `https://loom21.com/${this.localeId}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Terms of Service', 'item': `https://loom21.com/${this.localeId}/terms/` }
        ]
      }
    ]);
  }

  ngOnDestroy(): void {
    this.metaService.removeTag("name='robots'");
  }
}
