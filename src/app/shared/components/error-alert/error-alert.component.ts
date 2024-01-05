import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cr-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {

  @Output() onClosed = new EventEmitter<boolean>();
  @Input() errorMessage: string = "Something went wrong..."
  @Input() success: boolean = false

  constructor() {

  }

  ngOnInit() {
    // Ensure that updateProperty is defined before using it
    if (this.onClosed === undefined) {
      throw new Error('Input property "updateProperty" is not provided.');
    }
  }

  onClose(): void {
    this.onClosed.emit(true);
  }
}
