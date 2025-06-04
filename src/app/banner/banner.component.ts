import { CommonModule } from '@angular/common';
import { Component, Inject, isDevMode, LOCALE_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  appUrl: string;
  currentLocale: string;

  constructor(@Inject(LOCALE_ID) protected localeId: string, private languageService: LanguageService) {
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
    this.languageService.switchLocale(locale);
  }
}