import { Component, Input } from '@angular/core';

@Component({
  selector: 'cr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = "Click"
  @Input() disabled: boolean = false
}

