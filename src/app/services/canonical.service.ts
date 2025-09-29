import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  private readonly languages = [
    { lang: 'en', baseUrl: 'https://loom21.com/en', appBaseUrl: 'https://app.loom21.com/en' },
    { lang: 'bg', baseUrl: 'https://loom21.com/bg', appBaseUrl: 'https://app.loom21.com/bg' },
  ];
  private readonly defaultLang = 'en';

  constructor(
    @Inject(DOCUMENT) private dom: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  setCanonicalURL(url?: string) {
    const existingLink = this.dom.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');

    const isAppSubdomain = this.dom.location.hostname.includes('app.loom21.com');
    const baseDomain = isAppSubdomain ? 'https://app.loom21.com' : 'https://loom21.com';

    // Ensure trailing slash for consistency
    const currentPath = this.router.url.endsWith('/') ? this.router.url : `${this.router.url}/`;
    const canonicalUrl = url || `${baseDomain}${currentPath}`;
    link.setAttribute('href', canonicalUrl);
    this.dom.head.appendChild(link);
  }

  setHreflangTags() {
    const existingLinks = this.dom.querySelectorAll('link[rel="alternate"][hreflang]');
    existingLinks.forEach((link) => link.remove());

    const currentPath = this.router.url.replace(/^\/(en|bg)(\/|$)/, '/').replace(/\/$/, '') || '/';
    const isAppSubdomain = this.dom.location.hostname.includes('app.loom21.com');

    this.languages.forEach(({ lang, baseUrl, appBaseUrl }) => {
      const url = `${isAppSubdomain ? appBaseUrl : baseUrl}${currentPath}`;
      const link: HTMLLinkElement = this.dom.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', url);
      this.dom.head.appendChild(link);

      if (lang === this.defaultLang) {
        const defaultLink: HTMLLinkElement = this.dom.createElement('link');
        defaultLink.setAttribute('rel', 'alternate');
        defaultLink.setAttribute('hreflang', 'x-default');
        defaultLink.setAttribute('href', url);
        this.dom.head.appendChild(defaultLink);
      }
    });
  }
}