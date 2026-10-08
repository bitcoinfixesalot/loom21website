import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ProtectedEmailComponent } from './protected-email.component';

describe('ProtectedEmailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedEmailComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('hides the address until the button is clicked', async () => {
    const fixture = TestBed.createComponent(ProtectedEmailComponent);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).not.toContain('@');

    el.querySelector('button')!.click();
    await fixture.whenStable();
    const link = el.querySelector('a')!;
    expect(link.getAttribute('href')).toBe('mailto:info@loom21.com');
  });
});
