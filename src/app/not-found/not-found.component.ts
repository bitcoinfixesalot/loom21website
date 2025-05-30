import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    imports: [RouterLink],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  part1 = $localize`:@@errorMessagePart1:Join Loom 21 back at the `;
  homepage = $localize`:@@homepage:homepage`;
  part2 = $localize`:@@errorMessagePart2: or `;
  contactUs = $localize`:@@contactUsPart:contact us`;
  part3 = $localize`:@@errorMessagePart3: for help.`;
}
