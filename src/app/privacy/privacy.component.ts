import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PRIVACY_CONSTANTS } from '../constants/privacy-policy-const';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TITLES, DESCRIPTIONS } from '../constants/localized-const';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyComponent implements OnInit{
 CONSTANTS = PRIVACY_CONSTANTS;

 constructor(private titleService: Title,
    private metaService: Meta) {
 }

 ngOnInit(): void {
     this.titleService.setTitle(TITLES.privacy);
     this.setMetaTags();
 }

 private setMetaTags(): void {
    this.metaService.updateTag({
      name: 'description',
      content: DESCRIPTIONS.privacy_description
    });
  }
}
