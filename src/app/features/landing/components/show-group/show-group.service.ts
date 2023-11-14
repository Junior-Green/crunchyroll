import { Injectable } from '@angular/core';
import { ShowGroup } from 'src/app/core/models/show-group.model';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { getRandomNumberBetween } from 'src/app/core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class ShowGroupService {
  showGroupsPromise: Promise<void>;
  showGroups: ShowGroup[] = []
  advertsPromise: Promise<void>;
  adverts: string[] = []

  constructor(firebase: FirebaseService) {
    this.showGroupsPromise = firebase.getShowGroups().then((groups) => {
      this.showGroups = groups;
    }).catch((err) => {
      console.error(err)
    })

    this.advertsPromise = firebase.getLandingAdverts().then((landingAdverts) => {
      this.adverts = landingAdverts
    }).catch((err) => {
      console.error(err)
    })
  }

  async getShowGroup(): Promise<ShowGroup> {
    await this.showGroupsPromise
    if (this.showGroups.length === 0) {
      return Promise.reject('Empty array...')
    }
    const randomIndex = getRandomNumberBetween(0, this.showGroups.length)
    return this.showGroups.splice(randomIndex, 1).at(0)!
  }

  async getAdvertUrl(): Promise<string> {
    await this.advertsPromise
    if (this.adverts.length === 0) {
      return Promise.reject('Empty array...')
    }
    const randomIndex = getRandomNumberBetween(0, this.adverts.length)
    return this.adverts.splice(randomIndex, 1).at(0)!
  }

  pickRandomShow(shows: Show[]): Show | null {
    if (shows.length === 0) return null
    else if (shows.length === 1) return shows.at(0)!

    return shows.at(getRandomNumberBetween(0, shows.length))!
  }

  async showGroupsRemaining(): Promise<number> {
    await this.showGroupsPromise
    return this.showGroups.length
  }
}
