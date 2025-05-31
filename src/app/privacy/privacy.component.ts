import { Component } from '@angular/core';
import { PRIVACY_CONSTANTS } from '../constants/privacy-policy-const';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
 CONSTANTS = PRIVACY_CONSTANTS;
}
