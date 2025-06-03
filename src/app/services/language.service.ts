import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private router: Router, private location: Location) {}

  switchLocale(locale: string) {
    // Validate locale
    if (!['bg', 'en'].includes(locale)) {
      console.warn('Invalid locale:', locale);
      return;
    }

    // Get the current URL from the router
    let currentUrl = this.router.url;

    // Fallback to location.path() if router.url is empty
    if (!currentUrl || currentUrl === '/') {
      currentUrl = this.location.path();
    }

    // If still empty, default to root
    if (!currentUrl || currentUrl === '') {
      currentUrl = '/';
    }

    // Extract the path after the locale (if any)
    let pathWithoutLocale = currentUrl;
    if (currentUrl.match(/^\/(bg|en)(\/|$)/)) {
      pathWithoutLocale = currentUrl.replace(/^\/(bg|en)(\/|$)/, '/');
    } else {
      // If no locale is present in the URL, assume it's the root or a non-locale route
      pathWithoutLocale = currentUrl === '/' ? '' : currentUrl;
    }

    // Construct the new URL with the selected locale
    const newPath = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

    // If using separate builds, perform a full redirect
    // This is necessary for @angular/localize with separate builds
    window.location.href = newPath;

    // If using a single build with client-side routing, use:
    // this.router.navigateByUrl(newPath);
  }
}