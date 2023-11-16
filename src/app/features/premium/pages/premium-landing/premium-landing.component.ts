import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'firebase/auth';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { PremiumLandingService } from '../../services/premium-landing.service';
import { fromEvent, map } from 'rxjs';
import { debounce } from 'src/app/core/utils/helpers';
@Component({
  selector: 'cr-premium-landing',
  templateUrl: './premium-landing.component.html',
  styleUrls: ['./premium-landing.component.scss'],
  providers: [PremiumLandingService]
})
export class PremiumLandingComponent implements OnDestroy, AfterViewInit {
  loggedInPremiumButtonLabel: string = "START MEGA FAN MEMBERSHIP"
  loggedOutPremiumButtonLabel: string = "TRY MEGA FAN FREE FOR 14 DAYS"
  loggedInPremiumDesc: string = "Your account will automatically renew at $12.49 per month. You may cancel at any time."
  loggedOutPremiumDesc: string = "After your free Crunchyroll Premium: Mega Fan trial, your account will automatically renew at $12.49 per month. You may cancel at any time."
  loggedIn: boolean = false;
  showError: boolean = false;
  showFixedHeader: boolean = false;
  errorMessage: string = ""
  fanPerks: string[] = ['Stream on 1 device at a time'];
  megaFanPerks: string[] = ['Stream on up to 4 devices at a time', 'Offline Viewing', '$15 off $100 purchase in the Crunchyroll Store every 3 months']
  megaFanDiscountPerks: string[] = this.megaFanPerks.concat(['16% discount on Monthly Plan (billed every 12-months)'])

  @ViewChild('plansTarget', { static: false }) plansRef: ElementRef | undefined;
  @ViewChild('disclaimerTarget', { static: false }) disclaimerRef: ElementRef | undefined;

  private scroll = (event: any): void => {
    this.showFixedHeader = false
  };

  private scrollend = (event: any): void => {
    throw new Error('No function')
  };

  private unsub: Unsubscribe;

  constructor(firebase: FirebaseService, private service: PremiumLandingService) {
    this.unsub = firebase.subscribeToAuthState((loggedIn) => this.loggedIn = loggedIn);
  }

  ngAfterViewInit(): void {
    this.scrollToPlans()

    this.scrollend = debounce((event: any) => {
      const plansScrollPos: number = this.plansRef?.nativeElement.offsetTop
      const currScrollPos: number = document.body.scrollTop

      if (currScrollPos > 70 && currScrollPos < plansScrollPos) {
        console.log('helloo')
        this.showFixedHeader = true
      }

    
    }, 1000)

    window.addEventListener('scroll', this.scroll, true);
    window.addEventListener('scrollend', this.scrollend, true); //third parameter
  }

  scrollToPlans(): void {
    if (this.plansRef) {
      const element = this.plansRef.nativeElement;
      element.scrollIntoView({ behavior: 'smooth' }); // Use 'auto' for instant scroll
    }
  }

  scrollToDisclaimer(): void {
    if (this.disclaimerRef) {
      const element = this.disclaimerRef.nativeElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
    window.removeEventListener('scroll', this.scroll, true);
    window.removeEventListener('scrollend', this.scrollend, true);
  }
}

