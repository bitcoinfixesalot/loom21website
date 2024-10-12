import { Component, ElementRef } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent {
  headings: Element[] | undefined;

  constructor(
    //private elementRef: ElementRef<HTMLElement>,
  ) { }
  srcPath = 'assets/README.md'//"https://raw.githubusercontent.com/loom21/loom21doc/main/README.md";
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
