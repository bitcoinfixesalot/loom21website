import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESPONSE } from '../../express.tokens';

@Component({
    selector: 'app-not-found',
    imports: [RouterLink],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  constructor() {
    // RESPONSE is only provided during SSR (see server.ts); absent in the browser.
    inject(RESPONSE, { optional: true })?.status(404);
  }

  part1 = $localize`:@@errorMessagePart1:Join Loom21 back at the `;
  homepage = $localize`:@@homepage:homepage`;
  part2 = $localize`:@@errorMessagePart2: or `;
  contactUs = $localize`:@@contactUsPart:contact us`;
  part3 = $localize`:@@errorMessagePart3: for help.`;
}
