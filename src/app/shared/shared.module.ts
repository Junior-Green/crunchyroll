import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [],
  exports: [
    MatIconModule,
    TooltipModule,
    BsDropdownModule,
  ]
})
export class SharedModule { }
