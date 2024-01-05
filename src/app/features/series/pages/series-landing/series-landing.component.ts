import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import RatingsDistribution from 'src/app/core/models/ratings-distribution';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ShowService } from 'src/app/core/services/show.service';

@Component({
  selector: 'cr-series-landing',
  templateUrl: './series-landing.component.html',
  styleUrls: ['./series-landing.component.scss']
})
export class SeriesLandingComponent {
  @ViewChild('reviews', { static: false }) reviewsRef: ElementRef | undefined;

  showPromise: Promise<Show>;
  loading: boolean = true;
  collapsed = true

  constructor(router: Router, firebase: FirebaseService, private showService: ShowService, title: Title) {
    const url = router.url
    const showId = url.split('/').pop()
    if (showId === undefined) {
      router.navigate(['/404'])
    }

    let showResolver: (value: Show | PromiseLike<Show>) => void;
    let showRejecter: (reason?: any) => void;
    this.showPromise = new Promise<Show>((resolve, reject) => {
      showResolver = resolve
      showRejecter = reject
    })

    firebase.getShow(showId!).then((show) => {
      showResolver(show)
      title.setTitle('Watch ' + show.title)
      this.loading = false;
    }).catch((err) => {
      showRejecter(err)
    })
  }

  scrollToReviews() {
    if (this.reviewsRef) {
      const element = this.reviewsRef.nativeElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  getShowDescriptor(show: Show): string {
    return this.showService.getShowDescriptor(show)
  }
  getShowRatingAverage(show: Show): number {
    return this.showService.getAverageRating(show)
  }
  getReviewCount(show: Show): number {
    return this.showService.getReviewCount(show)
  }
  getRatingsDistribution(show: Show): RatingsDistribution {
    return this.showService.getRatingsDistribution(show)
  }
}
