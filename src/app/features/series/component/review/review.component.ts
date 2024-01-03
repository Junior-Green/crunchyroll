import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Review from 'src/app/core/models/review.model';
import { Timestamp } from "firebase/firestore";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase.service';


@Component({
  selector: 'cr-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input({ required: true }) review!: Review;
  @Output() feedbackSubmitted = new EventEmitter<{ review: Review, helpful: boolean }>();

  userId: string | null;
  fillStar: number[] = [];
  lineStar: number[] = [];

  helpful: boolean | undefined;

  constructor(private datePipe: DatePipe, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, firebase: FirebaseService) {
    this.userId = firebase.currentUserId()
  }

  ngOnInit(): void {
    this.fillStar = new Array(this.review.rating).fill(0);
    this.lineStar = new Array(5 - this.review.rating).fill(0);

    this.matIconRegistry.addSvgIcon(
      'star-outline', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/star.svg')
    );

    this.review.submitted.forEach(({ userId, helpful }) => {
      if (userId === this.userId) {    
        this.helpful = helpful
      }
    })
  }

  isHelpful(val: boolean) {
    if (this.helpful === undefined) {
      this.helpful = val
      this.feedbackSubmitted.emit({ review: this.review, helpful: val })
      this.review = {
        ...this.review,
        likes: val ? (this.review.likes + 1) : this.review.likes,
        dislikes: val ? this.review.dislikes : (this.review.dislikes + 1)
      }
    }
  }

  formatFirebaseTimestamp(timestamp: Timestamp): string {
    const date = new Date(timestamp.toMillis()); // Convert Firebase timestamp to JavaScript Date
    const formattedDate = this.datePipe.transform(date, 'dd MMM yyyy');

    if (formattedDate === null) {
      throw new Error('Date could not be formatted')
    }
    return formattedDate;
  }

}
