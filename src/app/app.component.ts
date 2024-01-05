import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  renderNavbar = true;
  urlSubscription: Subscription
  renderNavbarRoutes: RegExp[] = [
    /^\/$/,
    /^\/series\/.*$/
  ]

  constructor(private router: Router) {
    this.urlSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        this.renderNavbar = this.renderNavbarRoutes.some((regex) => {
          const res = event.url.match(regex)

          if (res === null) return false
          else return res.length !== 0
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe()
  }
}
