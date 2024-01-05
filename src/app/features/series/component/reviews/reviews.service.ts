import { Injectable } from '@angular/core';
import ReviewFormModel from 'src/app/core/models/review-form.model';
import Review from 'src/app/core/models/review.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  sortOptions: string[] = ['Newest', 'Oldest', 'Most helpful']
  filterOptions: string[] = ['All', '1 star', '2 star', '3 star', '4 star', '5 star']

  constructor(private firebase: FirebaseService) { }

  postReview(review: ReviewFormModel, showId: string) {
    return this.firebase.postReview(review, showId)
  }

  sortReviews(sortOption: number, filterOption: number, reviewsToSort: Review[]): Review[] {

    let predicateFunc: (value: Review) => boolean;
    let comparator: (a: Review, b: Review) => number;

    switch (this.filterOptions[filterOption]) {
      case "1 star":
        predicateFunc = (review) => {
          return review.rating === 1
        }
        break;
      case "2 star":
        predicateFunc = (review) => {
          return review.rating === 2
        }
        break;
      case "3 star":
        predicateFunc = (review) => {
          return review.rating === 3
        }
        break;
      case "4 star":
        predicateFunc = (review) => {
          return review.rating === 4
        }
        break;
      case "5 star":
        predicateFunc = (review) => {
          return review.rating === 5
        }
        break;
      default:
      case "ALL":
        predicateFunc = (_) => {
          return true
        }
        break;
    }

    switch (this.sortOptions[sortOption]) {
      default:
      case "Newest":
        comparator = (a, b) => {
          if (a.date > b.date) return -1
          if (a.date === b.date) return 0
          else return 1
        }
        break;

      case "Oldest":
        comparator = (a, b) => {
          if (a.date < b.date) return -1
          if (a.date === b.date) return 0
          else return 1
        }
        break;

      case "Most helpful":
        comparator = (a, b) => {
          if (a.likes > b.likes) return -1
          if (a.likes === b.likes) return 0
          else return 1
        }
        break;
    }

    return reviewsToSort.filter(predicateFunc).sort(comparator)
  }
}
