import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, isDevMode, LOCALE_ID, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { SHOW_FEATURES_MENU } from '../constants/product-const';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-banner',
  imports: [UpperCasePipe, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  readonly showFeaturesMenu = SHOW_FEATURES_MENU;
  appUrl: string;
  currentLocale: string;
  private readonly menu = viewChild<ElementRef<HTMLElement>>('menu');

  constructor(@Inject(LOCALE_ID) protected localeId: string, private languageService: LanguageService, router: Router) {
    this.currentLocale = localeId; // Get the current locale from Angular

    this.appUrl = 'https://app.loom21.com/';
    if (isDevMode()) {
      this.appUrl = 'https://localhost:44412/'
    }
    if (this.localeId == 'bg') {
      this.appUrl = 'https://app.loom21.com/bg/'
    }

    // The header is sticky, so an open mobile menu would stay over the new page after a navigation
    router.events
      .pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.closeMenu());
  }

  switchLocale(locale: string) {
    this.languageService.switchLocale(locale);
  }

  private closeMenu(): void {
    const menu = this.menu()?.nativeElement;
    if (!menu?.classList.contains('show')) {
      return; // also covers the server, where the menu is never open
    }
    // Bootstrap's bundle is loaded from the CDN in index.html
    (window as any).bootstrap?.Collapse.getOrCreateInstance(menu).hide();
  }
}
