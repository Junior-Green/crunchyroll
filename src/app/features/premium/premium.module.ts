import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumRoutingModule } from './premium-routing.module';
import { PremiumLandingComponent } from './pages/premium-landing/premium-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PremiumButtonComponent } from './components/premium-button/premium-button.component';


@NgModule({
  declarations: [
    PremiumLandingComponent,
    PremiumButtonComponent
  ],
  imports: [
    CommonModule,
    PremiumRoutingModule,
    SharedModule
  ]
})
export class PremiumModule { }
