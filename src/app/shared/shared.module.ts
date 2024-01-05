import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { ButtonComponent } from './components/button/button.component';
import { TranslucentHeaderComponent } from './components/translucent-header/translucent-header.component';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { CollapseableComponent } from './components/collapseable/collapseable.component';
import { RatingModule } from 'ngx-bootstrap/rating'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorAlertComponent,
    ButtonComponent,
    TranslucentHeaderComponent,
    CheckBoxComponent,
    DropdownComponent,
    FooterNavComponent,
    CollapseableComponent
  ],
  imports: [
    MatIconModule,
    RouterModule,
    BsDropdownModule,
    CommonModule,
  ],
  exports: [
    MatIconModule,
    TooltipModule,
    BsDropdownModule,
    FooterComponent,
    HeaderComponent,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ErrorAlertComponent,
    ButtonComponent,
    TranslucentHeaderComponent,
    CheckBoxComponent,
    CarouselModule,
    TooltipModule,
    NgxSkeletonLoaderModule,
    ProgressbarModule,
    DropdownComponent,
    FooterNavComponent,
    CollapseableComponent,
    RatingModule
  ]
})
export class SharedModule { }
