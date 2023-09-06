import { Component, OnDestroy, OnInit } from '@angular/core';
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
  unsubscribe: Unsubscribe;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router: Router, private firebase: FirebaseService) {
    this.unsubscribe = firebase.getAuthState((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
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

  ngOnDestroy(): void {
    this.unsubscribe()
  }

}
