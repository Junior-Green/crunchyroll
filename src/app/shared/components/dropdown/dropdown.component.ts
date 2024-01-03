import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cr-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  menuDropdownShowing = false;
  selectedOption: number = 0;

  @Input() options!: string[];
  @Input() defaultOption: number = 0;
  @Input() dropup: boolean = false;
  @Input() icon: string = "arrow_drop_down";
  @Output() onSelected = new EventEmitter<number>();

  ngOnInit(): void {
    this.selectedOption = this.defaultOption;
  }

  menuDropdownHandler(state: 'onShown' | 'onHidden') {
    if (state === 'onShown') {
      this.menuDropdownShowing = true
    }
    else {
      this.menuDropdownShowing = false
    }
  }

  changeSelectedOption(option: number) {
    this.selectedOption = option
    this.onSelected.emit(option)
  }
}
