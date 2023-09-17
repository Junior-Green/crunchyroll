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
  renderNavbarRoutes: string[] = [
    ''
  ]

  constructor(private router: Router) {
    this.urlSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.renderNavbar = this.renderNavbarRoutes.includes(event.url.substring(1))
      }
    })
  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe()
  }
}
