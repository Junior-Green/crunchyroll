import { Injectable } from '@angular/core';
import Show from '../models/show.model';
import { roundToDecimal } from '../utils/helpers';
import RatingsDistribution from '../models/ratings-distribution';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

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

  getAverageRating(show: Show): number {
    if (show.reviews.length === 0) return 0

    
    return roundToDecimal(show.reviews.reduce((prev, curr) => {
      return prev + curr.rating
    }, 0) / show.reviews.length, 1)
  }

  getReviewCount(show: Show): number {
    return show.reviews.length
  }

  getRatingsDistribution(show: Show): RatingsDistribution {
    if (show.reviews.length === 0) {
      return {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    }
    const counter = show.reviews.reduce<RatingsDistribution>((prev, curr) => {
      prev[curr.rating] += 1
      return prev
    }, {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    })

    return {
      5: (counter[5] / show.reviews.length) * 100,
      4: (counter[4] / show.reviews.length) * 100,
      3: (counter[3] / show.reviews.length) * 100,
      2: (counter[2] / show.reviews.length) * 100,
      1: (counter[1] / show.reviews.length) * 100,
    }
  }

}
