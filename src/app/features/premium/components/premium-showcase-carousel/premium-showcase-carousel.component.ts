import { Component } from '@angular/core';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'cr-premium-showcase-carousel',
  templateUrl: './premium-showcase-carousel.component.html',
  styleUrls: ['./premium-showcase-carousel.component.scss']
})
export class PremiumShowcaseCarouselComponent {
  shows: Show[];

  constructor(firebase: FirebaseService) {
    this.shows = firebase.getPremiumShowcase()
  }
}
