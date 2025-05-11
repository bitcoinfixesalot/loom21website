import { CommonModule } from '@angular/common';
import { Component, Inject, isDevMode, LOCALE_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  appUrl: string;
  
  constructor(@Inject(LOCALE_ID) protected localeId: string) {
    this.appUrl = 'https://app.loom21.com/';
    if (isDevMode()) {
      this.appUrl = 'https://localhost:44412/'
    }
    if (this.localeId == 'bg') {
      this.appUrl = 'https://app.loom21.com/bg/'
    }
  }
}