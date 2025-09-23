import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  // Define supported languages and their base URLs
  private readonly languages = [
    { lang: 'en', baseUrl: 'https://loom21.com/en', appBaseUrl: 'https://app.loom21.com/en' },
    { lang: 'bg', baseUrl: 'https://loom21.com/bg', appBaseUrl: 'https://app.loom21.com/bg' },
    // Add more languages here, e.g., { lang: 'es', baseUrl: 'https://loom21.com/es', appBaseUrl: 'https://app.loom21.com/es' }
  ];
  private readonly defaultLang = 'en'; // Default language for x-default

  constructor(
    @Inject(DOCUMENT) private dom: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
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

    // Determine base domain based on hostname
    const isAppSubdomain = this.dom.location.hostname.includes('app.loom21.com');
    const baseDomain = isAppSubdomain ? 'https://app.loom21.com' : 'https://loom21.com';

    // Use provided URL or construct from current route
    const canonicalUrl = url || `${baseDomain}${this.router.url}`;
    link.setAttribute('href', canonicalUrl);
    this.dom.head.appendChild(link);
  }

  setHreflangTags() {
    // Remove existing hreflang tags
    const existingLinks = this.dom.querySelectorAll('link[rel="alternate"][hreflang]');
    existingLinks.forEach((link) => link.remove());

    // Get current path without language prefix
    const currentPath = this.router.url.replace(/^\/(en|bg|es|de)(\/|$)/, '/');
    const isAppSubdomain = this.dom.location.hostname.includes('app.loom21.com');

    // Generate hreflang tags for each language
    this.languages.forEach(({ lang, baseUrl, appBaseUrl }) => {
      const url = `${isAppSubdomain ? appBaseUrl : baseUrl}${currentPath}`;
      const link: HTMLLinkElement = this.dom.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', url);
      this.dom.head.appendChild(link);

      // Add x-default for the default language
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