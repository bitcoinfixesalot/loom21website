import { Component, ElementRef, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MarkdownComponent } from 'ngx-markdown';
import { DESCRIPTIONS, LD_JSON, TITLES } from '../constants/localized-const';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit {
  headings: Element[] | undefined;

  constructor(@Inject(LOCALE_ID) protected localeId: string,private titleService: Title, private metaService: Meta
  ) { 
  }

  ngOnInit(): void {
    if(this.localeId !== "en")
      this.srcPath = 'https://raw.githubusercontent.com/loom21/loom21doc/main/README-bg.md';


    this.titleService.setTitle(TITLES.documentation);
        this.metaService.updateTag({
          name: 'description',
          content: DESCRIPTIONS.documentation_description//'Reset your password to manage inventory, payments, and Bitcoin conversions.'
        });
        this.metaService.addTag({
          name: 'application/ld+json',
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Documentation - Loom 21',
            'description': LD_JSON.documentation_description,
            'isPartOf': {
              '@type': 'WebSite',
              'name': 'Loom 21'
            }
          })
        });
  }

  srcPath = "https://raw.githubusercontent.com/loom21/loom21doc/main/README.md";
  // onLoad(): void {
  //   this.stripContent();
  //   this.setHeadings();
  // }

  // private setHeadings(): void {
  //   const headings: Element[] = [];
  //   this.elementRef.nativeElement
  //     .querySelectorAll('h2')
  //     .forEach(x => headings.push(x));
  //   this.headings = headings;
  // }

  // private stripContent(): void {
  //   this.elementRef.nativeElement
  //     .querySelector('markdown')!
  //     .querySelectorAll('markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents')
  //     .forEach(x => x.remove());
  // }
}
