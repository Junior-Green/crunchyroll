import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'firebase/auth';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { PremiumLandingService } from '../../services/premium-landing.service';
@Component({
  selector: 'cr-premium-landing',
  templateUrl: './premium-landing.component.html',
  styleUrls: ['./premium-landing.component.scss'],
  providers: [PremiumLandingService]
})
export class PremiumLandingComponent implements OnDestroy {

  loggedInPremiumButtonLabel: string = "START MEGA FAN MEMBERSHIP"
  loggedOutPremiumButtonLabel: string = "TRY MEGA FAN FREE FOR 14 DAYS"
  loggedInPremiumDesc: string = "Your account will automatically renew at $12.49 per month. You may cancel at any time."
  loggedOutPremiumDesc: string = "After your free Crunchyroll Premium: Mega Fan trial, your account will automatically renew at $12.49 per month. You may cancel at any time."
  loggedIn: boolean = false;
  showError: boolean = false;
  errorMessage: string = ""

  private unsub: Unsubscribe;

  constructor(firebase: FirebaseService, private service: PremiumLandingService) {
    this.unsub = firebase.subscribeToAuthState((loggedIn) => this.loggedIn = loggedIn);
  }

  scrollToPlans(): void {

  }

  scrollToDisclaimer(): void {

  }

  upgradeToPremium(): void {
    this.showError = false;
    this.service.upgradeToPremium().catch((err) => {
      this.showError = true
      this.errorMessage = err
    })
  }

  closeAlert(): void {
    this.showError = false;
  }

  ngOnDestroy(): void {
    this.unsub()
  }
}
