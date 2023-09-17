import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { convertCommaDelimitedToArray } from 'src/app/core/utils/helpers';

@Component({
  selector: 'cr-premium-landing',
  templateUrl: './premium-landing.component.html',
  styleUrls: ['./premium-landing.component.scss']
})
export class PremiumLandingComponent implements OnDestroy {

  loggedInPremiumButtonLabel: string = "START MEGA FAN MEMBERSHIP"
  loggedOutPremiumButtonLabel: string = "TRY MEGA FAN FREE FOR 14 DAYS"
  loggedInPremiumDesc: string = "Your account will automatically renew at $12.49 per month. You may cancel at any time."
  loggedOutPremiumDesc: string = "After your free Crunchyroll Premium: Mega Fan trial, your account will automatically renew at $12.49 per month. You may cancel at any time."
  loggedIn: boolean = false;
  showError: boolean = false;
  errorMessage: string = ""

  private unsub: Unsubscribe;

  constructor(private firebase: FirebaseService, private router: Router) {
    this.unsub = firebase.subscribeToAuthState((loggedIn) => this.loggedIn = loggedIn);
  }
  scrollToPlans(): void {

  }

  upgradeToPremium(): void {
    this.showError = false;
    this.firebase.upgradeToPremium().then(() => {
      this.router.navigate(['/'])
    }).catch((err: string) => {
      this.showError = true
      this.errorMessage = err
    })
  }

  addShow() {
    const show: Show = {
      title: "Overlord",
      audio: convertCommaDelimitedToArray("Japanese"),
      description: "When a popular MMORPG is scheduled to be shut down permanently, veteran player Momonga refuses to log out. As NPCs begin to develop personalities and minds of their own he decides to put his skills to use as the game’s new overlord.",
      dub: false,
      sub: true,
      subtitles: convertCommaDelimitedToArray("English, Español (América Latina), Português (Brasil)"),
      genres: [
        "Action",
        "Adventure",
        "Fantasy",
        "Supernatural"
      ],
      publisher: "Kadokawa Pictures Inc.",
    }
    this.firebase.addShow(show)
  }

  ngOnDestroy(): void {
    this.unsub()
  }
}
