import { Component, HostListener } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DESCRIPTIONS, TAGS } from './constants/localized-const';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { AnchorService } from './services/anchor.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, BannerComponent, FooterComponent, CommonModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'loom21website';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.anchorService.interceptClick(event);
  }
  


   constructor(private titleService: Title,private meta: Meta,private anchorService: AnchorService) {
    this.meta.addTags([
      {name: "description", content: DESCRIPTIONS.home_description},
      {name: "keywords", content:TAGS.home_keywords},
      {name: "author", content: "loom 21"},
    ]);
    
    this.titleService.setTitle("Loom 21");
   }
}
