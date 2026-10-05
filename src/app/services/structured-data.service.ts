import { DOCUMENT, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StructuredDataService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  setJsonLd(schemas: object[]): void {
    this.dom.head.querySelectorAll('script[type="application/ld+json"][data-ld-json]').forEach(el => el.remove());

    schemas.forEach(schema => {
      const script: HTMLScriptElement = this.dom.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-ld-json', 'true');
      script.textContent = JSON.stringify(schema);
      this.dom.head.appendChild(script);
    });
  }
}
