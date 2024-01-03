import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesLandingComponent } from './pages/series-landing/series-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReviewsComponent } from './component/reviews/reviews.component';
import { ReviewComponent } from './component/review/review.component';
import { MoreLikeCarouselComponent } from './component/more-like-carousel/more-like-carousel.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SeriesLandingComponent,
    ReviewsComponent,
    ReviewComponent,
    MoreLikeCarouselComponent
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    DatePipe
  ]
})
export class SeriesModule { }
