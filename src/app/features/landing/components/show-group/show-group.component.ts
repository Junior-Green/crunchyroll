import { Component } from '@angular/core';
import Show from 'src/app/core/models/show.model';
import { randomBoolean } from 'src/app/core/utils/helpers';

@Component({
  selector: 'cr-show-group',
  templateUrl: './show-group.component.html',
  styleUrls: ['./show-group.component.scss']
})
export class ShowGroupComponent {
  shows: Show[] = []
  showAd: boolean;
  showHighlight1: boolean;
  showHighlight2: boolean;

  constructor() {
    this.showAd = randomBoolean()
    this.showHighlight1 = randomBoolean()
    this.showHighlight2 = randomBoolean()
  }
}
