import { Component, HostListener, Inject, OnDestroy, OnInit, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { DESCRIPTIONS, TAGS } from './constants/localized-const';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';

import { AnchorService } from './services/anchor.service';
import { CanonicalService } from './services/canonical.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BannerComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'loom21website';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.anchorService.interceptClick(event);
  }

  private routerSubscription!: Subscription;

  constructor(@Inject(DOCUMENT) private dom: Document,
  private router: Router,
  private titleService: Title, private meta: Meta, private anchorService: AnchorService, private canonicalService: CanonicalService) {
    this.meta.addTags([
      { name: "description", content: DESCRIPTIONS.home_description },
      { name: "keywords", content: TAGS.home_keywords },
      { name: "author", content: "loom 21" },
    ]);

    this.titleService.setTitle("Loom 21");
  }

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.canonicalService.setCanonicalURL();
        this.canonicalService.setHreflangTags();
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
