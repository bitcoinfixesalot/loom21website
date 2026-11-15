import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Renders "Label: rest of the sentence" with only the label in bold.
 * Usage: <li [appLeadIn]="text"></li>. Text without ": " is shown as is.
 */
@Component({
  selector: '[appLeadIn]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@if (parts().label) {<strong>{{ parts().label }}</strong>}{{ parts().rest }}`,
})
export class LeadInComponent {
  readonly text = input.required<string>({ alias: 'appLeadIn' });

  protected readonly parts = computed(() => {
    const text = this.text();
    const end = text.indexOf(': ');
    return end < 0 ? { label: '', rest: text } : { label: text.slice(0, end + 1), rest: text.slice(end + 1) };
  });
}
