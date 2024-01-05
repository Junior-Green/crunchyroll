import { Component } from '@angular/core';

@Component({
  selector: 'cr-collapseable',
  templateUrl: './collapseable.component.html',
  styleUrls: ['./collapseable.component.scss']
})
export class CollapseableComponent {
  collapsed: boolean = true;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
