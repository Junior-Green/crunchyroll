import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Injectable()
export class PremiumLandingService {

  constructor(private firebase: FirebaseService, private router: Router) { }


  async upgradeToPremium(): Promise<void> {
    return this.firebase.upgradeToPremium().then(() => {
      this.router.navigate(['/'])
    })
  }
}
