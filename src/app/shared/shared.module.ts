import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [],
  exports: [
    MatIconModule,
    TooltipModule,
    BsDropdownModule,
    AlertModule
  ]
})
export class SharedModule { }
