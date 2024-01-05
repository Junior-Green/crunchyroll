import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesLandingComponent } from './pages/series-landing/series-landing.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/404",
    pathMatch: "full"
  },
  {
    path: ":id",
    pathMatch: "full",
    component: SeriesLandingComponent
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/404"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriesRoutingModule { }
