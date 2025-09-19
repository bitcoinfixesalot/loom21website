import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  setCanonicalURL(url?: string) {
    // Remove existing canonical tag if it exists
    const existingLink = this.dom.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    // Create new canonical tag
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    const canonicalUrl = url || this.dom.location.href; // Use current URL or provided URL
    link.setAttribute('href', canonicalUrl);
    this.dom.head.appendChild(link);
  }

  setHreflangTags() {
  const languages = [
    { lang: 'en', url: 'https://loom21.com/en/' },
    { lang: 'bg', url: 'https://loom21.com/bg/' },
    { lang: 'x-default', url: 'https://loom21.com/en/' },
  ];

  languages.forEach(({ lang, url }) => {
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang);
    link.setAttribute('href', url);
    this.dom.head.appendChild(link);
  });
}
}