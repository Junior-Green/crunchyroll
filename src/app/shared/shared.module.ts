import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    MatIconModule,
    RouterModule,
    BsDropdownModule,
    CommonModule
  ],
  exports: [
    MatIconModule,
    TooltipModule,
    BsDropdownModule,
    FooterComponent,
    HeaderComponent,
    AlertModule,
  ]
})
export class SharedModule { }
