import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document,
  private router: Router) {}

  setCanonicalURL(url?: string) {
  const existingLink = this.dom.querySelector('link[rel="canonical"]');
  if (existingLink) {
    existingLink.remove();
  }

  const link: HTMLLinkElement = this.dom.createElement('link');
  link.setAttribute('rel', 'canonical');
  // Determine the base domain based on the current hostname
  const baseDomain = this.dom.location.hostname.includes('app.loom21.com')
    ? 'https://app.loom21.com'
    : 'https://loom21.com';
  const canonicalUrl = url || `${baseDomain}${this.router.url}`;
  link.setAttribute('href', canonicalUrl);
  this.dom.head.appendChild(link);
}

setHreflangTags() {
  const existingLinks = this.dom.querySelectorAll('link[rel="alternate"][hreflang]');
  existingLinks.forEach((link) => link.remove());

  const currentPath = this.router.url.replace(/^\/(en|bg)\//, '/');
  const isAppSubdomain = this.dom.location.hostname.includes('app.loom21.com');
  const baseDomain = isAppSubdomain ? 'https://app.loom21.com' : 'https://loom21.com';
  const languages = [
    { lang: 'en', url: `${baseDomain}/en${currentPath}` },
    { lang: 'bg', url: `${baseDomain}/bg${currentPath}` },
    { lang: 'x-default', url: `${baseDomain}/en${currentPath}` },
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