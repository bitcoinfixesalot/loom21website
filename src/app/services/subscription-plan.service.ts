import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {
  private apiUrl: string;
  constructor(private http: HttpClient) { 
    if (isDevMode()) {
      this.apiUrl =  'http://localhost:5000/api/payments';

    }
    else {
      this.apiUrl =  'https://app.loom21.com/api/payments';
    }
  }

  getAvailablePlans() {
    const headers = new HttpHeaders().set('apiKey', 'GET_AVAILABLE_PLANS_FOR_THE_MAXIS'); // Set your API key here
    return this.http.get<SubscriptionType[]>(`${this.apiUrl}/available-plans/`, { headers });
  }
}


export interface SubscriptionType{
  id: number;
  productId: string;
  productName: string;
  priceId: string;
  interval: string;
  amount: number; // Amount in cents
  currency: string;
  perMonthText: string;

  type: string;
  usersText: string;
  ordersText: string;
  storesText: string;
  userAccessText: string;
  apiText: string;
}