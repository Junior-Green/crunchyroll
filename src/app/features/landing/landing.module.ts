import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FooterNavComponent } from '../../shared/components/footer-nav/footer-nav.component';
import { FeaturedCarouselComponent } from './components/featured-carousel/featured-carousel.component';
import { ShowGroupComponent } from './components/show-group/show-group.component';
import { ShowGroupFeaturedComponent } from './components/show-group-featured/show-group-featured.component';


@NgModule({
  declarations: [
    HomeComponent,
    FeaturedCarouselComponent,
    ShowGroupComponent,
    ShowGroupFeaturedComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
  ]
})
export class LandingModule { }
