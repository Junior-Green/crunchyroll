import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  renderNavbar = true;
  urlSubscription: Subscription
  doNotRenderNavbarRoutes: string[] = [
    'auth/register',
    'auth/login'
  ]

  constructor(private router: Router) {
    this.urlSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.renderNavbar = !this.doNotRenderNavbarRoutes.includes(event.url.substring(1))
      }
    })
  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe()
  }
}
