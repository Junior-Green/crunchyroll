import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'cr-logged-in-dropdown',
  templateUrl: './logged-in-dropdown.component.html',
  styleUrls: ['./logged-in-dropdown.component.scss']
})
export class LoggedInDropdownComponent implements OnInit {
  menuDropdownShowing: boolean = false;
  error: boolean = false;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private firebase: FirebaseService, private router: Router) { }
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
      this.router.navigate(['/login'])
    }).catch((err) => {
      console.log(err)
      this.error = true
    })
  }

  handleAlertClose() {
    this.error = false;
  }
}
