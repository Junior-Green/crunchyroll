import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumRoutingModule } from './premium-routing.module';
import { PremiumLandingComponent } from './pages/premium-landing/premium-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PremiumButtonComponent } from './components/premium-button/premium-button.component';
import { PremiumShowcaseCarouselComponent } from './components/premium-showcase-carousel/premium-showcase-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { PremiumPlanComponent } from './components/premium-plan/premium-plan.component';
import { PremiumHeaderComponent } from './components/premium-header/premium-header.component';


@NgModule({
  declarations: [
    PremiumLandingComponent,
    PremiumButtonComponent,
    PremiumShowcaseCarouselComponent,
    PremiumPlanComponent,
    PremiumHeaderComponent,
  ],
  imports: [
    CommonModule,
    PremiumRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class PremiumModule { }
