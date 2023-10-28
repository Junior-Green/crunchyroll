import { Component } from '@angular/core';
import Show from 'src/app/core/models/show.model';
import { randomBoolean } from 'src/app/core/utils/helpers';
import { ShowGroupService } from './show-group.service';
import { ShowGroup } from 'src/app/core/models/show-group.model';

@Component({
  selector: 'cr-show-group',
  templateUrl: './show-group.component.html',
  styleUrls: ['./show-group.component.scss'],
  providers: [ShowGroupService]
})
export class ShowGroupComponent {
  loading = true;
  showGroup: ShowGroup | undefined;
  advertUrl: string | undefined;
  showHighlight1: boolean;
  showHighlight2: boolean;
  highlight1: Show | undefined;
  highlight2: Show | undefined;

  constructor(service: ShowGroupService) {
    this.showHighlight1 = randomBoolean()
    this.showHighlight2 = randomBoolean()

    service.getShowGroup().then(group => {
      this.showGroup = group;
      const show1 = service.pickRandomShow(group.shows)
      if (show1 === null) {
        this.showHighlight1 = false;
      }
      if (this.showGroup.shows.length < 2) {
        this.showHighlight2 = false
      }
      if (this.showHighlight2) {
        let show2 = service.pickRandomShow(group.shows)
        while (show2?.showId === show1?.showId) {
          show2 = service.pickRandomShow(group.shows)
        }
        if (!show2) {
          this.showHighlight2 = false;
        }
      }
      if (randomBoolean()) {
        service.getAdvertUrl().then(url => {
          this.advertUrl = url;
          this.loading = false;
        })
      }
      else {
        this.loading = false;
      }
    })
  }
}
