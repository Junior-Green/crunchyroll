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
  advertPromise: Promise<string>;
  highlight1Promise: Promise<Show>;
  highlight2Promise: Promise<Show>;
  showGroupPromise: Promise<ShowGroup>;

  constructor(service: ShowGroupService) {
    let showGroupResolve: (value: ShowGroup | PromiseLike<ShowGroup>) => void;
    let showGroupReject: (reason?: any) => void;

    let highlight1Resolve: (value: Show | PromiseLike<Show>) => void;
    let highlight1Reject: (reason?: any) => void;

    let highlight2Resolve: (value: Show | PromiseLike<Show>) => void;
    let highlight2Reject: (reason?: any) => void;

    let advertResolve: (value: string | PromiseLike<string>) => void;
    let advertReject: (reason?: any) => void;

    this.showGroupPromise = new Promise(function (resolve, reject) {
      showGroupResolve = resolve
      showGroupReject = reject
    })
    this.highlight1Promise = new Promise(function (resolve, reject) {
      highlight1Resolve = resolve
      highlight1Reject = reject
    })
    this.advertPromise = new Promise(function (resolve, reject) {
      advertResolve = resolve
      advertReject = reject
    })
    this.highlight2Promise = new Promise(function (resolve, reject) {
      highlight2Resolve = resolve
      highlight2Reject = reject
    })

    let show1: Show | null;
    let show2: Show | null;

    service.getShowGroup().then(group => {
      showGroupResolve(group)

      if (randomBoolean()) {
        show1 = service.pickRandomShow(group.shows)
        show1 === null ? highlight1Reject() : highlight1Resolve(show1)
      }
      if (randomBoolean() && group.shows.length > 1) {
        show2 = service.pickRandomShow(group.shows)
        while (show2?.showId === show1?.showId) {
          show2 = service.pickRandomShow(group.shows)
        }
        show2 === null ? highlight2Reject() : highlight2Resolve(show2)
      }
      if (randomBoolean()) {
        service.getAdvertUrl().then(url => {
          advertResolve(url)
        }).catch((reason) => {
          advertReject(reason)
        }).finally(() => {
          this.loading = false
        })
      }
      else {
        this.loading = false;
      }
    }).catch((err) => {
      showGroupReject(err)
    })
  }
}
