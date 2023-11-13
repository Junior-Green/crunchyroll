import { Injectable } from '@angular/core';
import Show from '../models/show.model';
import { roundToDecimal } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor() { }


  getShowDescriptor(show: Show): string {
    let res = ""

    if (show.sub && show.dub) {
      res += "Sub | Dub "
    }
    else if (show.sub) {
      res += "Subtitled "
    }
    else {
      res += "Dubbed "
    }

    return res
  }

  calculateShowRating(show: Show): number {
    if (!show.reviews) return 0

    return roundToDecimal(show.reviews.reduce((prev, curr) => {
      return prev + curr.rating
    }, 0) / show.reviews.length, 1)
  }

  getFullShowDescriptor(show: Show): string {
    let res = ""

    if (show.sub && show.dub) {
      res += "Sub | Dub "
    }
    else if (show.sub) {
      res += "Subtitled "
    }
    else {
      res += "Dubbed "
    }

    if (show.genres.length > 0) {
      res += " ◆ "

      show.genres.forEach((genre, index) => {
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
