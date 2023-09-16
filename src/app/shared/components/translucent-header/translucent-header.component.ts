import { Component, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Unsubscribe } from 'firebase/auth';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'cr-translucent-header',
  templateUrl: './translucent-header.component.html',
  styleUrls: ['./translucent-header.component.scss']
})
export class TranslucentHeaderComponent implements OnDestroy {
  loggedIn: boolean = false;
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

  ngOnDestroy(): void {
    this.unsub()
  }
}
