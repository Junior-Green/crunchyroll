import { Component } from '@angular/core';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { PremiumShowcaseCarouselService } from './premium-showcase-carousel.service';

@Component({
  selector: 'cr-premium-showcase-carousel',
  templateUrl: './premium-showcase-carousel.component.html',
  styleUrls: ['./premium-showcase-carousel.component.scss'],
  providers: [PremiumShowcaseCarouselService]
})
export class PremiumShowcaseCarouselComponent {
  shows: Show[] = []

  constructor(service: PremiumShowcaseCarouselService) {
    service.getShows().then((shows) => {
      console.log(shows)
      this.shows = shows
    })
  }
}
