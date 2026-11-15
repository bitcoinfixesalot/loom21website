import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    inject(Title).setTitle($localize`:Not found page title@@notFoundTitle:Page not found | Loom21`);
  }

}
