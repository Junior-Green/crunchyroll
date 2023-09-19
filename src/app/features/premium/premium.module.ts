import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumRoutingModule } from './premium-routing.module';
import { PremiumLandingComponent } from './pages/premium-landing/premium-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PremiumButtonComponent } from './components/premium-button/premium-button.component';
import { PremiumShowcaseCarouselComponent } from './components/premium-showcase-carousel/premium-showcase-carousel.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PremiumLandingComponent,
    PremiumButtonComponent,
    PremiumShowcaseCarouselComponent
  ],
  imports: [
    CommonModule,
    PremiumRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class PremiumModule { }
