import { Component, HostListener } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { FeaturedCarouselService } from './featured-carousel.service';
import Show from 'src/app/core/models/show.model';
import { ShowService } from 'src/app/core/services/show.service';
import { screenSizes } from 'src/app/core/constants/constants';

@Component({
  selector: 'cr-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss']
})
export class FeaturedCarouselComponent {
  loadingData: boolean = true
  shows: Show[] = []
 
  constructor(service: FeaturedCarouselService, private showService: ShowService) {
    service.getFeaturedShows().then((shows) => {
      this.shows = shows
      this.loadingData = false
    })
  }

  getFullShowDescriptor(show: Show): string {
    return this.showService.getFullShowDescriptor(show)
  }
}
