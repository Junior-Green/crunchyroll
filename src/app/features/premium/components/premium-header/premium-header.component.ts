import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Unsubscribe } from 'firebase/auth';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'cr-premium-header',
  templateUrl: './premium-header.component.html',
  styleUrls: ['./premium-header.component.scss']
})
export class PremiumHeaderComponent implements OnDestroy {
  loggedIn: boolean = false;
  loggedInPremiumButtonLabel: string = "START MEGA FAN MEMBERSHIP"
  loggedOutPremiumButtonLabel: string = "TRY MEGA FAN FREE FOR 14 DAYS"

  @Output() premiumClick: EventEmitter<any> = new EventEmitter();

  private unsub: Unsubscribe;
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private firebase: FirebaseService) {
    this.unsub = firebase.subscribeToAuthState((isLoggedIn) => this.loggedIn = isLoggedIn);
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'cr-logo', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/crunchyroll-logo.svg')
    );
  }

  handlePremiumButton() {
    this.premiumClick.emit()
  }

  ngOnDestroy(): void {
    this.unsub()
  }
}

