import { CommonModule } from '@angular/common';
import { Component, Inject, isDevMode, LOCALE_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-banner',
    imports: [CommonModule, RouterModule],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {
  appUrl: string;
    currentLocale: string;

  constructor(@Inject(LOCALE_ID) protected localeId: string) {
        this.currentLocale = localeId; // Get the current locale from Angular

    this.appUrl = 'https://app.loom21.com/';
    if (isDevMode()) {
      this.appUrl = 'https://localhost:44412/'
    }
    if (this.localeId == 'bg') {
      this.appUrl = 'https://app.loom21.com/bg/'
    }
  }

  switchLocale(locale: string) {
    // Option 1: Redirect to a locale-specific route (if your app uses locale-based routing)
    window.location.href = `/${locale}`;

    // Option 2: Use query parameter to reload with new locale
    // window.location.href = `${window.location.pathname}?lang=${locale}`;

    // Option 3: Store in localStorage and reload (if server handles locale)
    // localStorage.setItem('locale', locale);
    // window.location.reload();
  }
}