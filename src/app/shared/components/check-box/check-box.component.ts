import { Component, Input } from '@angular/core';

@Component({
  selector: 'cr-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent {
  @Input() checked: boolean = false;
}
