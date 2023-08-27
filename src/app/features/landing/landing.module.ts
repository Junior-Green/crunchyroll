import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    LandingRoutingModule
  ]
})
export class LandingModule { }
