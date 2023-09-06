import { Component, Input } from '@angular/core';

@Component({
  selector: 'cr-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent {

  @Input() showing: boolean = false;
  @Input() errorMessage: string = "Something went wrong..."


  toggleVisibility() {
    this.showing = !this.showing;
  }
}
