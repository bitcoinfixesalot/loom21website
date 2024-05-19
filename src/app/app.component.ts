import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TAGS } from './constants/localized-const';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerComponent, FooterComponent, CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'loom21website';

   constructor(private meta: Meta) {
    this.meta.addTags([
      {name: "description", content: TAGS.home_description},
      {name: "keywords", content:TAGS.home_keywords},
      {name: "author", content: "loom 21"},
    ]);
    
   }


  // constructor(private meta: Meta, private title:Title) {
  //   this.meta.addTags([
  //     {name: "description", content: TAGS.home_description},
  //     {name: "keywords", content:TAGS.home_keywords},
  //     {name: "author", content: "loom 21"},
  //   ]);
  //   this.title.setTitle("Loom21"); //TODO: fix title
  //  }
}
