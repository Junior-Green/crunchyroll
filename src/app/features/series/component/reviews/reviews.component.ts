import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Unsubscribe } from 'firebase/auth';
import ReviewFormModel from 'src/app/core/models/review-form.model';
import Review from 'src/app/core/models/review.model';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ShowService } from 'src/app/core/services/show.service';
import { ReviewsService } from './reviews.service';

@Component({
  selector: 'cr-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @ViewChild('form') private form!: NgForm;

  @Input()
  show!: Show;

  reviewForm: ReviewFormModel = {
    rating: null,
    title: "",
    content: ""
  }

  hoverStarOption: number = 1
  unsub: Unsubscribe;
  loggedIn: boolean = false;
  alertShowing: boolean = false;
  alertError: boolean = false
  alertMessage: string = ''
  sortOption: number = 0;
  filterOption: number = 0;

  reviews: Review[] = []

  constructor(private showService: ShowService, private firebase: FirebaseService, private router: Router, private reviewsService: ReviewsService) {
    this.unsub = firebase.subscribeToAuthState((loggedIn) => {
      this.loggedIn = loggedIn
    })
  }

  ngOnInit(): void {
    this.reviews = this.reviewsService.sortReviews(this.sortOption, this.filterOption, this.show.reviews)
  }

  sortHandler(index: number) {
    this.sortOption = index
    this.reviews = this.reviewsService.sortReviews(this.sortOption, this.filterOption, this.show.reviews)
  }

  filterHandler(index: number) {
    this.filterOption = index
    this.reviews = this.reviewsService.sortReviews(this.sortOption, this.filterOption, this.show.reviews)
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

      this.firebase.updateFeedback(this.show.showId, event.review, event.helpful).then((res) => {
        if (res) {
          this.alertError = false;
          this.alertMessage = 'Thanks for the feedback!'
          this.alertShowing = true
        }
        else {
          this.alertError = true;
          this.alertMessage = 'An error occured.'
          this.alertShowing = true
        }
      })
    }
  }

  getSortOptions(): string[] {
    return this.reviewsService.sortOptions
  }

  getFilterOptions(): string[] {
    return this.reviewsService.filterOptions
  }

  postReview() {
    this.reviewsService.postReview(this.reviewForm, this.show.showId).then((res) => {
      if (res) {
        this.alertError = false;
        this.alertMessage = 'Thanks for the feedback!'
      }
      else {
        this.alertError = true;
        this.alertMessage = 'An error occured. Please try again.'
      }
      this.alertShowing = true;
      this.form.reset({
        rating: null,
        title: "",
        content: ""
      })
    })
  }

  closeAlert() {
    this.alertShowing = false
  }

  ngOnDestroy(): void {
    this.unsub()
  }
}
