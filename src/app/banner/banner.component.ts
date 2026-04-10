import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, isDevMode, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-banner',
  imports: [UpperCasePipe, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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