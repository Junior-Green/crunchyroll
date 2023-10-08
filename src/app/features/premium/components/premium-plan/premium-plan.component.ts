import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'cr-premium-plan',
  templateUrl: './premium-plan.component.html',
  styleUrls: ['./premium-plan.component.scss']
})
export class PremiumPlanComponent implements OnDestroy {
  @Input() planName: string = ''
  @Input() popular: boolean = false
  @Input() price: number = 9.99
  @Input() perks: string[] = [];

  private unsub;
  loggedIn: boolean = false;

  constructor(private firebase: FirebaseService, private router: Router) {
    this.unsub = firebase.subscribeToAuthState((loggedIn) => {
      this.loggedIn = loggedIn;
    })
  }

  upgradeToPremium() {
    if (this.firebase.isLoggedIn()) {
      this.firebase.upgradeToPremium().finally(() => {
        this.router.navigate(['/'])
      })
    }
    else {
      this.router.navigate(['/auth/login'])
    }
  }

  ngOnDestroy(): void {
    this.unsub();
  }

}
