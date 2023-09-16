import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremiumLandingComponent } from './pages/premium-landing/premium-landing.component';
import { NoPageFoundComponent } from '../error/pages/no-page-found/no-page-found.component';

const routes: Routes = [
  { path: '', component: PremiumLandingComponent },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumRoutingModule { }
