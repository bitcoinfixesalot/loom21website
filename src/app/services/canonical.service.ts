
import { Inject, Injectable, LOCALE_ID, DOCUMENT } from '@angular/core';
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
    @Inject(LOCALE_ID) private localeId: string,
    private router: Router
  ) {}

  setCanonicalURL(url?: string) {
 
    // Remove existing canonical tag
    const existingLink = this.dom.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    // Create new canonical tag
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');

    // Determine base domain
    //const isLocal = this.dom.location.hostname.includes('localhost');
    const isAppSubdomain = this.dom.location.hostname.includes('app.loom21.com');
    const baseDomain = isAppSubdomain ? 'https://app.loom21.com' : 'https://loom21.com';

    // router.url is relative to APP_BASE_HREF (language prefix already stripped)
    let currentPath = this.router.url;
    currentPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

    // Construct canonical URL using LOCALE_ID to get the correct language prefix
    const canonicalUrl = url || `${baseDomain}/${this.localeId}${currentPath}`;
    link.setAttribute('href', canonicalUrl);
    this.dom.head.appendChild(link);
  }

  setHreflangTags() {

    // Remove existing hreflang tags
    const existingLinks = this.dom.querySelectorAll('link[rel="alternate"][hreflang]');
    existingLinks.forEach((link) => link.remove());

    // Get current path without language prefix
    const currentPath = this.router.url.replace(/^\/(en|bg)/, '') || '/';
    //const isLocal = this.dom.location.hostname.includes('localhost');
    const isAppSubdomain = this.dom.location.hostname.includes('app.loom21.com');

    // Generate hreflang tags
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