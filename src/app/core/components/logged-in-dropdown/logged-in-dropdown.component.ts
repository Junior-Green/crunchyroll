import { Router } from '@angular/router';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseService } from '../../services/firebase.service';
import { Unsubscribe } from 'firebase/auth';

@Component({
  selector: 'cr-logged-in-dropdown',
  templateUrl: './logged-in-dropdown.component.html',
  styleUrls: ['./logged-in-dropdown.component.scss']
})
export class LoggedInDropdownComponent implements OnInit, OnDestroy {
  menuDropdownShowing: boolean = false;
  isPremium: boolean = false;
  unsub: Unsubscribe | null

  @Output() dataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private firebase: FirebaseService, private router: Router) {
    this.unsub = this.firebase.subscribeToPremiumState((isPremium) => {
      this.isPremium = isPremium
      this.dataEmitter.emit(this.isPremium);
    })
  }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'cr-crown', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/crown.svg')
    );
  }

  menuDropdownHandler(state: 'onShown' | 'onHidden') {
    if (state === 'onShown') {
      this.menuDropdownShowing = true
    }
    else {
      this.menuDropdownShowing = false
    }
  }

  handleLogOut() {
    this.firebase.signOut().then(() => {
      this.router.navigate(['/auth/login'])
    }).catch((err) => {
      console.log(err)
    })
  }

  ngOnDestroy() {
    this.unsub?.()
  }
}
