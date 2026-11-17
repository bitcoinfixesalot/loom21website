import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyButtonComponent } from './buy-button.component';
import { BUY_BUTTON_SNIPPET } from '../constants/buy-button-const';

describe('BuyButtonComponent', () => {
  let component: BuyButtonComponent;
  let fixture: ComponentFixture<BuyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyButtonComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tags the sign-up links with the buy_button campaign', () => {
    const links = [...fixture.nativeElement.querySelectorAll('a[href*="signup"]')] as HTMLAnchorElement[];
    expect(links.length).toBe(2);
    links.forEach(a => expect(a.href).toContain('utm_source=website&utm_medium=landing&utm_campaign=buy_button'));
  });

  it('shows the snippet with a placeholder key only', () => {
    const code = fixture.nativeElement.querySelector('pre code').textContent;
    expect(code).toBe(BUY_BUTTON_SNIPPET);
    expect(code).toContain('l21_pk_live_YOUR_KEY');
  });

  it('copies the snippet and shows "Copied"', async () => {
    const write = spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    fixture.nativeElement.querySelector('.bb-copy').click();
    await fixture.whenStable();
    expect(write).toHaveBeenCalledWith(BUY_BUTTON_SNIPPET);
    expect(component.copyState()).toBe('copied');
    expect(fixture.nativeElement.querySelector('.bb-copy').textContent).toContain('Copied');
  });

  it('tells the visitor to copy manually when the clipboard is blocked', async () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.reject(new Error('denied')));
    await component.copySnippet();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.bb-note').textContent).toContain('Copy failed');
  });
});
