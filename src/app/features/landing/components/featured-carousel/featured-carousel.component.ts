import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { FeaturedCarouselService } from './featured-carousel.service';
import Show from 'src/app/core/models/show.model';

@Component({
  selector: 'cr-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss']
})
export class FeaturedCarouselComponent {
  loadingData: boolean = true
  shows: Show[] = []

  constructor(service: FeaturedCarouselService) {
    service.getFeaturedShows().then((shows) => {
      this.shows = shows
      this.loadingData = false
    })
  }

  getShowDescriptor(isSub: boolean, isDub: boolean, genres: ("Action" | "Adventure" | "Comedy" | "Drama" | "Fantasy" | "Music" | "Romance" | "Sci-Fi" | "Seinen" | "Shojo" | "Shonen" | "Slice of life" | "Sports" | "Supernatural" | "Thriller")[]): string {
    let res = ""

    if (isSub && isDub) {
      res += "Sub | Dub "
    }
    else if (isSub) {
      res += "Subtitled "
    }
    else {
      res += "Dubbed "
    }

    if (genres.length > 0) {
      res += " ◆ "

      genres.forEach((genre, index) => {
        if (index === 0) {
          res += `${genre}`
        }
        else {
          res += `, ${genre}`
        }
      }
      )
    }
    return res
  }
}
