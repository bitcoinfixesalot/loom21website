import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { emailAddress } from '../../constants/contact-const';

/** Shows the contact email only after a click, so it is never in the prerendered HTML. */
@Component({
  selector: 'app-protected-email',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (revealed()) {
      <a [href]="'mailto:' + address" class="protected-email">{{ address }}</a>
    } @else {
      <button type="button" class="btn btn-link p-0 align-baseline" (click)="revealed.set(true)"
        i18n="Show email button@@showEmail">Show email address</button>
    }
  `,
})
export class ProtectedEmailComponent {
  readonly revealed = signal(false);
  readonly address = emailAddress();
}
