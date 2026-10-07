import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingComponent } from './pricing.component';
import { SubscriptionType } from '../services/subscription-plan.service';
import { TIER_PRICES } from '../constants/pricing-const';

// Captured from the app backend's available-plans endpoint (feature/pricing-plans-v2).
const API_PLANS: SubscriptionType[] = [
  { id: 56, type: 'starter', interval: 'bitcoin', amount: 2160 },
  { id: 52, type: 'starter', interval: 'year', amount: 2400 },
  { id: 53, type: 'starter', interval: 'month', amount: 2900 },
  { id: 55, type: 'growth', interval: 'bitcoin', amount: 5940 },
  { id: 50, type: 'growth', interval: 'year', amount: 6600 },
  { id: 51, type: 'growth', interval: 'month', amount: 7900 },
  { id: 54, type: 'pro', interval: 'bitcoin', amount: 13410 },
  { id: 48, type: 'pro', interval: 'year', amount: 14900 },
  { id: 49, type: 'pro', interval: 'month', amount: 17900 },
].map(p => ({ ...p, productId: 'prod', productName: p.type, priceId: 'price', currency: 'eur' }));

describe('PricingComponent', () => {
  let component: PricingComponent;
  let fixture: ComponentFixture<PricingComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  const respond = () => http.expectOne(r => r.url.endsWith('/available-plans/')).flush(API_PLANS);

  it('renders all four tiers before the API answers', () => {
    const cards = fixture.nativeElement.querySelectorAll('.pricing-plan');
    expect(cards.length).toBe(4);
  });

  it('matches every API amount to the constants (no Stripe drift)', () => {
    for (const p of API_PLANS) {
      const tier = p.type as 'starter' | 'growth' | 'pro';
      expect(TIER_PRICES[tier][p.interval as 'month' | 'year' | 'bitcoin']).withContext(`${p.type}/${p.interval}`).toBe(p.amount);
    }
  });

  it('maps each paid tier to the checkout id for the selected billing mode', () => {
    respond();
    const expected: Record<string, Record<string, number>> = {
      month: { starter: 53, growth: 51, pro: 49 },
      year: { starter: 52, growth: 50, pro: 48 },
      bitcoin: { starter: 56, growth: 55, pro: 54 },
    };
    for (const mode of ['month', 'year', 'bitcoin'] as const) {
      component.billing.set(mode);
      const ids = Object.fromEntries(component.cards().filter(c => c.key !== 'free').map(c => [c.key, c.apiId]));
      expect(ids).withContext(mode).toEqual(expected[mode]);
    }
  });

  it('opens checkout for paid plans and signup for Free', () => {
    respond();
    const open = spyOn(window, 'open');
    component.billing.set('month');
    const [free, starter] = component.cards();
    component.onSelect(free);
    component.onSelect(starter);
    expect(open.calls.argsFor(0)[0]).toMatch(/signup\/$/);
    expect(open.calls.argsFor(1)[0]).toMatch(/plans\/53$/);
  });

  it('falls back to signup and shows a notice when the API fails', () => {
    http.expectOne(r => r.url.endsWith('/available-plans/')).flush('down', { status: 503, statusText: 'Unavailable' });
    fixture.detectChanges();
    const open = spyOn(window, 'open');
    component.onSelect(component.cards()[2]);
    expect(open.calls.argsFor(0)[0]).toMatch(/signup\/$/);
    expect(fixture.nativeElement.querySelector('.checkout-notice')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.pricing-plan').length).toBe(4);
  });
});
