import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { Unsubscribe } from 'firebase/auth';

@Component({
  selector: 'cr-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isPremium: boolean = false;
  unsubscribeAuthState: Unsubscribe;
  unsubscribePremiumState: Unsubscribe | null = null;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router: Router, firebase: FirebaseService) {
    this.unsubscribeAuthState = firebase.subscribeToAuthState((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;

      this.unsubscribePremiumState?.()

      this.unsubscribePremiumState = firebase.subscribeToPremiumState((isPremium) => {
        this.isPremium = isPremium
      })

      if (this.unsubscribePremiumState === null) {
        this.isPremium = false;
      }
    })
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'cr-logo', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/crunchyroll-logo.svg')
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route])
  }

  recieveEmission(data: boolean): void {
    this.isPremium = data
  }

  ngOnDestroy(): void {
    this.unsubscribeAuthState()
    this.unsubscribePremiumState?.()
  }
}
