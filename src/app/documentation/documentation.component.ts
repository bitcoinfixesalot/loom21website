import { ChangeDetectionStrategy, Component, ElementRef, Inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MarkdownComponent } from 'ngx-markdown';
import { DESCRIPTIONS, LD_JSON, TITLES } from '../constants/localized-const';
import { OgMetaService } from '../services/og-meta.service';
import { StructuredDataService } from '../services/structured-data.service';

interface NavHeading {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'app-documentation',
  imports: [MarkdownComponent],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent implements OnInit {
  isLoading = signal(true);
  hasError = signal(false);
  headings = signal<NavHeading[]>([]);
  activeId = signal('');
  srcPath = 'https://raw.githubusercontent.com/loom21/loom21doc/main/README.md';
  private baseSrcPath = '';

  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    private titleService: Title,
    private metaService: Meta,
    private ogMetaService: OgMetaService,
    private structuredDataService: StructuredDataService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    if (this.localeId !== 'en') {
      this.srcPath = 'https://raw.githubusercontent.com/loom21/loom21doc/main/README-bg.md';
    }
    this.baseSrcPath = this.srcPath;

    this.titleService.setTitle(TITLES.documentation);
    this.metaService.updateTag({ name: 'description', content: DESCRIPTIONS.documentation_description });
    this.ogMetaService.setOgTags({ title: TITLES.documentation, description: DESCRIPTIONS.documentation_description });

    this.structuredDataService.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `https://loom21.com/${this.localeId}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Documentation', 'item': `https://loom21.com/${this.localeId}/docs/` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Documentation | Loom21',
        'description': LD_JSON.documentation_description,
        'isPartOf': { '@type': 'WebSite', 'name': 'Loom21' }
      }
    ]);
  }

  onMarkdownLoad(): void {
    this.isLoading.set(false);
    this.hasError.set(false);
    this.extractHeadings();
  }

  onMarkdownError(): void {
    this.isLoading.set(false);
    this.hasError.set(true);
  }

  retryLoad(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.srcPath = `${this.baseSrcPath}?retry=${Date.now()}`;
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeId.set(id);
  }

  private extractHeadings(): void {
    const markdownEl: HTMLElement | null = this.elementRef.nativeElement.querySelector('markdown');
    if (!markdownEl) return;

    const items: NavHeading[] = [];
    markdownEl.querySelectorAll('h2, h3').forEach((el: Element) => {
      // README anchors are <a id="section-name"> children of the heading
      const anchor = el.querySelector('a[id]');
      const id = anchor?.getAttribute('id') || el.getAttribute('id') || '';
      const text = el.textContent?.trim() || '';
      const level = parseInt(el.tagName.charAt(1));
      if (id && text) items.push({ id, text, level });
    });

    this.headings.set(items);
  }
}
