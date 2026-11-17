import { ChangeDetectionStrategy, Component, ElementRef, Inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { BREADCRUMBS, DESCRIPTIONS, LD_JSON, TITLES } from '../constants/localized-const';
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
    private elementRef: ElementRef,
    private route: ActivatedRoute
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
          { '@type': 'ListItem', 'position': 1, 'name': BREADCRUMBS.home, 'item': `https://loom21.com/${this.localeId}/` },
          { '@type': 'ListItem', 'position': 2, 'name': BREADCRUMBS.documentation, 'item': `https://loom21.com/${this.localeId}/docs/` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': TITLES.documentation,
        'description': LD_JSON.documentation_description,
        'isPartOf': { '@type': 'WebSite', 'name': 'Loom21' }
      }
    ]);
  }

  onMarkdownLoad(): void {
    this.isLoading.set(false);
    this.hasError.set(false);
    this.extractHeadings();
    this.scrollToFragment();
  }

  // The router's anchor scrolling runs before the markdown arrives, so links like /docs#payment-links
  // would land at the top. Scroll once the content is in the page, and again after the screenshots
  // above the anchor have loaded (they have no size attributes, so they push the anchor down).
  private scrollToFragment(): void {
    const id = this.route.snapshot.fragment;
    if (!id) return;
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const scroll = () => target.scrollIntoView({ block: 'start' });
      scroll();
      this.activeId.set(id);
      const pending = [...this.elementRef.nativeElement.querySelectorAll('markdown img')]
        .filter((img: HTMLImageElement) => !img.complete && (target.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_PRECEDING))
        .map((img: HTMLImageElement) => new Promise(done => { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }));
      if (pending.length) {
        Promise.race([Promise.all(pending), new Promise(done => setTimeout(done, 3000))]).then(scroll);
      }
    });
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

  /** Screenshots are too small to read on a phone: a tap opens the full-size image in a new tab. */
  openImage(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLImageElement && !target.closest('a')) {
      window.open(target.currentSrc || target.src, '_blank', 'noopener');
    }
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
