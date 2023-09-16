import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { Show } from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

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
      title: "Demon Slayer: Kimetsu no Yaiba",
      audio: [
        "Japanese",
        "English",
        "Deutsch",
        "Español (América Latina)",
        "Español (España)",
        "Français",
        "Italiano",
        "Português (Brasil)",
        "Русский"
      ],
      description: "Gabimaru reigns as the strongest and most ruthless assassin in his village. But now finds himself on death row—with only one way out: retrieve the Elixir of Life from a sinister island. Longing for freedom, he accepts the challenge. But with fellow convicts vying for the same prize and demonic beasts lurking, how will Gabimaru survive this harrowing quest?",
      dub: true,
      sub: true,
      subtitles: [
        "English",
        "Deutsch",
        "Español (América Latina)",
        "Español (España)",
        "Français",
        "Italiano",
        "Português (Brasil)",
        "Русский",
        "العربية"
      ],
      genres: [
        "Action", "Drama", "Fantasy", "Shonen"
      ],
      publisher: "TWIN ENGINE Inc",
    }
    this.firebase.addShow(show)
  }

  ngOnDestroy(): void {
    this.unsub()
  }
}
