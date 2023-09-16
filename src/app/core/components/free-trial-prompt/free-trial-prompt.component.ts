import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseService } from '../../services/firebase.service';
import { Observable, map } from 'rxjs';
import { Unsubscribe } from 'firebase/auth';

@Component({
  selector: 'cr-free-trial-prompt',
  templateUrl: './free-trial-prompt.component.html',
  styleUrls: ['./free-trial-prompt.component.scss']
})
export class FreeTrialPromptComponent implements OnInit, OnDestroy {
  loggedOutPremiumTooltipDescription: string = "Premium access includes unlimited anime, no ads, and new episodes shortly after they air in Japan. Try it now!"
  loggedInPremiumTooltipDescription: string = "Unlimited anime, no ads, and new episodes shortly after they appear in Japan. Starting at $9.99/month."
  loggedOutButtonLabel: string = "TRY FREE"
  loggedInButtonLabel: string = "GO"
  isLoggedIn: boolean = false;

  unsubscriber: Unsubscribe;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, firebase: FirebaseService) {
    this.unsubscriber = firebase.subscribeToAuthState((loggedIn) => {
      this.isLoggedIn = loggedIn;
    })
  }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'cr-crown', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/crown.svg')
    );
  }

  ngOnDestroy(): void {
    this.unsubscriber()
  }
}
