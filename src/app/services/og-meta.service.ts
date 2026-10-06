import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface OgMetaData {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OgMetaService {
  private readonly defaultImage = 'https://loom21.com/assets/images/form-banners/loom-app-laptop-mobile.png';
  private readonly siteName = 'Loom21';
  private readonly baseDomain = 'https://loom21.com';

  constructor(
    private meta: Meta,
    @Inject(LOCALE_ID) private localeId: string,
    private router: Router,
  ) {}

  setOgTags(data: OgMetaData): void {
    const ogLocale = this.localeId === 'bg' ? 'bg_BG' : 'en_US';
    const altLocale = this.localeId === 'bg' ? 'en_US' : 'bg_BG';
    let currentPath = this.router.url;
    currentPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
    const url = `${this.baseDomain}/${this.localeId}${currentPath}`;
    const image = data.image ?? this.defaultImage;
    const type = data.type ?? 'website';

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: ogLocale });
    this.meta.updateTag({ property: 'og:locale:alternate', content: altLocale });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }
}
