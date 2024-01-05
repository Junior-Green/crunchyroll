import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { screenSizes } from 'src/app/core/constants/constants';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ShowService } from 'src/app/core/services/show.service';

@Component({
  selector: 'cr-more-like-carousel',
  templateUrl: './more-like-carousel.component.html',
  styleUrls: ['./more-like-carousel.component.scss']
})
export class MoreLikeCarouselComponent {

  @Input({ required: true }) show!: Show;

  shows: Show[] = []

  screenWidth: number;
  thresholdWidth = screenSizes.medium;

  constructor(firebase: FirebaseService, private showService: ShowService, private router: Router) {
    this.screenWidth = window.innerWidth

    firebase.getAllShows().then((shows) => {
      this.shows = shows.filter((show) => {
        if (show.publisher === this.show.publisher) return true
        for (const genre of show.genres) {
          if (this.show.genres.includes(genre)) {
            return true
          }
        }
        return false;
      })
    })
  }

  goToUrl(url: string) {
    this.router.navigate([url])
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: Event): void {
    this.screenWidth = window.innerWidth;
  }


  getShowDescriptor() {
    return this.showService.getShowDescriptor(this.show)
  }
  calculateShowRating() {
    return this.showService.getAverageRating(this.show)
  }
}
