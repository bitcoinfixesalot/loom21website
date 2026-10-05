import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DESCRIPTIONS, LD_JSON, TITLES } from '../constants/localized-const';
import { IN_PROGRESS_ITEMS, PLANNED_ITEMS, ROADMAP_CONSTANTS, SHIPPED_ITEMS } from '../constants/roadmap-const';
import { OgMetaService } from '../services/og-meta.service';
import { StructuredDataService } from '../services/structured-data.service';

@Component({
  selector: 'app-roadmap',
  imports: [RouterLink],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoadmapComponent implements OnInit {
  CONSTANTS = ROADMAP_CONSTANTS;
  shippedItems = SHIPPED_ITEMS;
  inProgressItems = IN_PROGRESS_ITEMS;
  plannedItems = PLANNED_ITEMS;

  constructor(private titleService: Title, private metaService: Meta, private ogMetaService: OgMetaService, private structuredDataService: StructuredDataService, @Inject(LOCALE_ID) private localeId: string) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(TITLES.roadmap);
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.metaService.updateTag({ name: 'description', content: DESCRIPTIONS.roadmap_description });
    this.ogMetaService.setOgTags({ title: TITLES.roadmap, description: DESCRIPTIONS.roadmap_description });

    this.structuredDataService.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': TITLES.roadmap,
        'description': LD_JSON.roadmap_description,
        'isPartOf': { '@type': 'WebSite', 'name': 'Loom 21', 'url': 'https://loom21.com' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `https://loom21.com/${this.localeId}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Roadmap', 'item': `https://loom21.com/${this.localeId}/roadmap/` }
        ]
      }
    ]);
  }
}
