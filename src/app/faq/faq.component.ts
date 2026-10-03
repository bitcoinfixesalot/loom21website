import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DESCRIPTIONS, TITLES } from '../constants/localized-const';
import { FAQ_CATEGORIES, FAQ_CONSTANTS } from '../constants/faq-const';
import { OgMetaService } from '../services/og-meta.service';

@Component({
  selector: 'app-faq',
  imports: [RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent implements OnInit {
  categories = FAQ_CATEGORIES;
  FAQ_CONSTANTS = FAQ_CONSTANTS;

  constructor(private titleService: Title, private metaService: Meta, private ogMetaService: OgMetaService, @Inject(LOCALE_ID) private localeId: string) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(TITLES.faq);
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.metaService.updateTag({ name: 'description', content: DESCRIPTIONS.faq_description });
    this.ogMetaService.setOgTags({ title: TITLES.faq, description: DESCRIPTIONS.faq_description });

    this.metaService.addTag({
      name: 'application/ld+json',
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': this.categories.flatMap(category => category.items).map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
      })
    });

    this.metaService.addTag({
      name: 'application/ld+json',
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `https://loom21.com/${this.localeId}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'FAQ', 'item': `https://loom21.com/${this.localeId}/faq/` }
        ]
      })
    });
  }
}
