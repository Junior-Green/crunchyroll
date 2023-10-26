import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/landing/pages/home/home.component';
import { NoPageFoundComponent } from './features/error/pages/no-page-found/no-page-found.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vidoes', loadChildren: () => import('./features/videos/videos.module').then((m) => m.VideosModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule), canActivate: [authGuard] },
  { path: 'plans', loadChildren: () => import('./features/premium/premium.module').then((m) => m.PremiumModule) },
  { path: 'series', loadChildren: () => import('./features/series/series.module').then((m) => m.SeriesModule) },
  { path: '404', component: NoPageFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
