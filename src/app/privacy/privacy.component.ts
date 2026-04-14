import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { PRIVACY_CONSTANTS } from '../constants/privacy-policy-const';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TITLES, DESCRIPTIONS, LD_JSON } from '../constants/localized-const';
import { OgMetaService } from '../services/og-meta.service';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyComponent implements OnInit{
 CONSTANTS = PRIVACY_CONSTANTS;

 constructor(private titleService: Title,
    private metaService: Meta,
    private ogMetaService: OgMetaService,
    @Inject(LOCALE_ID) private localeId: string) {
 }

 ngOnInit(): void {
     this.titleService.setTitle(TITLES.privacy);
     this.setMetaTags();
 }

 private setMetaTags(): void {
    this.metaService.updateTag({
      name: 'description',
      content: DESCRIPTIONS.privacy_description
    });
    this.ogMetaService.setOgTags({ title: TITLES.privacy, description: DESCRIPTIONS.privacy_description });
    this.metaService.addTag({
      name: 'application/ld+json',
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': TITLES.privacy,
        'description': LD_JSON.privacy_description,
        'isPartOf': {
          '@type': 'WebSite',
          'name': 'Loom 21',
          'url': 'https://loom21.com'
        }
      })
    });
    this.metaService.addTag({
      name: 'application/ld+json',
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `https://loom21.com/${this.localeId}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Privacy Policy', 'item': `https://loom21.com/${this.localeId}/privacy-policy/` }
        ]
      })
    });
  }
}
