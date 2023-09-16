import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NoPageFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class ErrorModule { }
