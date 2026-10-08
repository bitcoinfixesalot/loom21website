import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MarkdownComponent } from 'ngx-markdown';
import { DESCRIPTIONS, TITLES } from '../constants/localized-const';
import { EMAIL_TOKEN, emailAddress, emailObfuscated } from '../constants/contact-const';
import { OgMetaService } from '../services/og-meta.service';
import { StructuredDataService } from '../services/structured-data.service';
import termsEn from './content/terms.en.md';
import termsBg from './content/terms.bg.md';

@Component({
  selector: 'app-terms',
  imports: [MarkdownComponent],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit {
  readonly content: string;

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    @Inject(PLATFORM_ID) platformId: object,
    private titleService: Title,
    private metaService: Meta,
    private ogMetaService: OgMetaService,
    private structuredDataService: StructuredDataService,
  ) {
    const source = this.localeId === 'bg' ? termsBg : termsEn;
    // Server/prerender: obfuscated text only. Browser: real mailto link.
    const email = isPlatformBrowser(platformId)
      ? `[${emailAddress()}](mailto:${emailAddress()})`
      : emailObfuscated();
    this.content = source.replaceAll(EMAIL_TOKEN, email);
  }

  ngOnInit(): void {
    this.titleService.setTitle(TITLES.terms);
    this.metaService.updateTag({ name: 'description', content: DESCRIPTIONS.terms_description });
    this.ogMetaService.setOgTags({ title: TITLES.terms, description: DESCRIPTIONS.terms_description });
    this.structuredDataService.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: TITLES.terms,
        url: `https://loom21.com/${this.localeId}/terms/`,
        isPartOf: { '@type': 'WebSite', name: 'Loom21', url: 'https://loom21.com' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://loom21.com/${this.localeId}/` },
          { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `https://loom21.com/${this.localeId}/terms/` },
        ],
      },
    ]);
  }
}
