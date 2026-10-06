import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.apiUrl = 'https://localhost:7284/api/subscriptions';
    }
    else {
      this.apiUrl = 'https://app.loom21.com/api/subscriptions';
    }
  }

  getAvailablePlans() {
    return this.http.get<SubscriptionType[]>(`${this.apiUrl}/available-plans/`);
  }
}

/** A checkout-able plan from the app API. Display text lives in constants/pricing-const.ts. */
export interface SubscriptionType {
  id: number;
  productId: string;
  productName: string;
  priceId: string;
  interval: 'month' | 'year' | 'bitcoin' | 'single' | string;
  amount: number;   // cents
  currency: string; // 'eur'
  type: string;     // 'starter' | 'growth' | 'pro' (new) — old codes are ignored
}
