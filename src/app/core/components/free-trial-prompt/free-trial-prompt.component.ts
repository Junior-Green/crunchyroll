import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseService } from '../../services/firebase.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'cr-free-trial-prompt',
  templateUrl: './free-trial-prompt.component.html',
  styleUrls: ['./free-trial-prompt.component.scss']
})
export class FreeTrialPromptComponent implements OnInit {
  loggedOutPremiumTooltipDescription: string = "Premium access includes unlimited anime, no ads, and new episodes shortly after they air in Japan. Try it now!"
  loggedInPremiumTooltipDescription: string = "Unlimited anime, no ads, and new episodes shortly after they appear in Japan. Starting at $9.99/month."
  loggedOutButtonLabel: string = "TRY FREE"
  loggedInButtonLabel: string = "GO"

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private firebase: FirebaseService) { }

  getTooltipDescription(): Observable<string> {
    return this.firebase.getAuthState().pipe(
      map(state => state ? this.loggedInPremiumTooltipDescription : this.loggedOutPremiumTooltipDescription)
    )
  }

  getButtonLabel(): Observable<string> {
    return this.firebase.getAuthState().pipe(
      map(state => state ? this.loggedInButtonLabel : this.loggedOutButtonLabel)
    )
  }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'cr-crown', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/crown.svg')
    );
  }
}
