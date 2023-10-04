import { Component, HostListener } from '@angular/core';
import Show from 'src/app/core/models/show.model';
import { PremiumShowcaseCarouselService } from './premium-showcase-carousel.service';
import { screenSizes } from 'src/app/core/constants/constants';

@Component({
  selector: 'cr-premium-showcase-carousel',
  templateUrl: './premium-showcase-carousel.component.html',
  styleUrls: ['./premium-showcase-carousel.component.scss'],
  providers: [PremiumShowcaseCarouselService]
})
export class PremiumShowcaseCarouselComponent {
  shows: Show[] = []
  screenWidth: number;
  thresholdWidth = screenSizes.medium;
  numItemsPerSlide: number = 6

  constructor(service: PremiumShowcaseCarouselService) {
    service.getShows().then((shows) => {
      console.log(shows)
      this.shows = shows
    })
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: Event): void {
    this.screenWidth = window.innerWidth;
  }
}
