import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
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
    AlertModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule
  ]
})
export class SharedModule { }
