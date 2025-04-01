import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SubscriptionPlanService, SubscriptionType } from '../services/subscription-plan.service';
import { first } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements OnInit{
  loading = true;
  selectedPlan = 'year'; // Default selection

  public plans: SubscriptionType[] = [];
  onboardingFee: number = 9900; // Example: $99.00 - adjust as needed


constructor(private subscriptionPlan: SubscriptionPlanService){
  
}

get activePlans() {
  return this.plans.filter(plan => plan.interval === this.selectedPlan);
}
   ngOnInit(): void {
    this.loading = true;

    this.subscriptionPlan.getAvailablePlans().pipe(first()).subscribe({
      next: (types: SubscriptionType[]) => {
        this.plans = types;
        this.plans.forEach((plan: SubscriptionType) => {
    
          this.setTexts(plan);
          if (plan.interval == 'year') {
            plan.perMonthText = $localize`:Billed annually@@billedAnnually:per month (billed annually)`;
          } else {
            plan.perMonthText = $localize`:Per month@@perMonth:per month`;
          }
        });
        this.loading = false;
    
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  setTexts(plan: SubscriptionType) {//TODO: refactor this
    if (plan.type == 'basic') {
      plan.usersText = $localize`:One User@@oneUser:1 user`;
      plan.ordersText = $localize`:Basic Orders@@basicOrders:1000 orders/year`;
      plan.storesText = $localize`:One Store Location@@oneStoreLocation:1 store location`;
      plan.userAccessText = $localize`:One User Access@@oneUserAccess:One user all access`;
      plan.apiText = $localize`:No Access to API@@noAccessToAPI:No API Access`;
    } else if (plan.type == 'small') {
      plan.usersText = $localize`:Five Users@@fiveUsers:5 users`;
      plan.ordersText = $localize`:Small Orders@@smallOrders:10 000 orders`;
      plan.storesText = $localize`:Five Store Location@@fiveStoreLocation:5 store locations`;
      plan.userAccessText = $localize`:User Access Rights@@userAccessRights:User Access Rights`;
      plan.apiText = $localize`:Limited Access to API@@limitedAccessToAPI:Limited Access to API`;
    } else if (plan.type == 'mid') {
      plan.usersText = $localize`:Ten User@@tenUsers:10 users`;
      plan.ordersText = $localize`:Mid Orders@@midOrders:50 000 orders`;
      plan.storesText = $localize`:Mid Store Location@@fiftyStoreLocation:50 store location`;
      plan.userAccessText = $localize`:User Access Rights@@userAccessRights:User Access Rights`;
      plan.apiText = $localize`:Full Access to API@@fullAccessToAPI: Full API Access`;
    }
  }

  onCreateOrder(licenseType: SubscriptionType): void {

  }

  onContactUs() {
    // Add your contact logic here, e.g., open a form, redirect, etc.
    console.log('Contact Us clicked');
    // Example: window.location.href = '/contact';
  }
}
