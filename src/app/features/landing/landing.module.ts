import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { FeaturedCarouselComponent } from './components/featured-carousel/featured-carousel.component';


@NgModule({
  declarations: [
    HomeComponent,
    FooterNavComponent,
    FeaturedCarouselComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ]
})
export class LandingModule { }
