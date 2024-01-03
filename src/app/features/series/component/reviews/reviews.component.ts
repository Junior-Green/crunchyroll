import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Unsubscribe } from 'firebase/auth';
import ReviewFormModel from 'src/app/core/models/review-form.model';
import Review from 'src/app/core/models/review.model';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ShowService } from 'src/app/core/services/show.service';

@Component({
  selector: 'cr-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy {
postReview() {
throw new Error('Method not implemented.');
}

  @Input()
  show!: Show;

  reviewForm: ReviewFormModel = {
    rating: null,
    title: "",
    content: ""
  }

  rating = 0

  hoverStarOption: number = 1
  unsub: Unsubscribe;
  loggedIn: boolean = false;
  showing: boolean = false;

  sortOptions: string[] = ['Newest', 'Oldest', 'Most helpful']
  filterOptions: string[] = ['All', '1 star', '2 star', '3 star', '4 star', '5 star']
  sortOption: number = 0;
  filterOption: number = 0;

  reviews: Review[] = []

  constructor(private showService: ShowService, private firebase: FirebaseService, private router: Router) {
    this.unsub = firebase.subscribeToAuthState((loggedIn) => {
      this.loggedIn = loggedIn
    })
  }

  ngOnInit(): void {
    this.reviews = this.show.reviews
  }

  sortHandler(index: number) {
    this.sortOption = index
    this.updateReviews()
  }

  filterHandler(index: number) {
    this.filterOption = index
    this.updateReviews()
  }

  ngOnDestroy(): void {
    this.unsub()
  }
  getAverageRating() {
    return this.showService.getAverageRating(this.show)
  }

  hoveringOver(value: number) {
    this.hoverStarOption = value
  }

  recievedFeedback(event: { review: Review, helpful: boolean }) {
    if (!this.loggedIn) {
      this.router.navigate(['/auth/login'])
    }
    else {
      this.showing = true
      this.firebase.updateFeedback(this.show.showId, event.review, event.helpful)
    }
  }

  closeAlert() {
    this.showing = false
  }

  private updateReviews(): void {
    let predicateFunc: (value: Review) => boolean;
    let comparator: (a: Review, b: Review) => number;

    switch (this.filterOptions[this.filterOption]) {
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

    switch (this.sortOptions[this.sortOption]) {
      default:
      case "Newest":
        comparator = (a, b) => {
          if (a.date < b.date) return -1
          if (a.date === b.date) return 0
          else return 1
        }
        break;

      case "Oldest":
        comparator = (a, b) => {
          if (a.date > b.date) return -1
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

    this.reviews = this.show.reviews.filter(predicateFunc).sort(comparator)
  }
}
