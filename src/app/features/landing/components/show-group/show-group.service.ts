import { Injectable } from '@angular/core';
import { ShowGroup } from 'src/app/core/models/show-group.model';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { getRandomNumberBetween } from 'src/app/core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class ShowGroupService {
  private showGroupsPromise: Promise<void>;
  private showGroups: ShowGroup[] = []
  private showGroupsCache: ShowGroup[] = []
  private advertsPromise: Promise<void>;
  private adverts: string[] = []
  private advertsCache: string[] = []
 

  constructor(firebase: FirebaseService) {
    this.showGroupsPromise = firebase.getShowGroups().then((groups) => {
      this.showGroups = groups;
      this.showGroupsCache = groups
    }).catch((err) => {
      console.error(err)
    })

    this.advertsPromise = firebase.getLandingAdverts().then((landingAdverts) => {
      this.adverts = landingAdverts
      this.advertsCache = landingAdverts
    }).catch((err) => {
      console.error(err)
    })
  }

  async getShowGroup(): Promise<ShowGroup> {
    await this.showGroupsPromise
    if (this.showGroups.length === 0) {
      return Promise.reject('No more showgroups available...')
    }
    const randomIndex = getRandomNumberBetween(0, this.showGroups.length)
    const showGroup = this.showGroups.at(randomIndex)

    this.showGroups = this.showGroups.filter((_, index) => {
      return randomIndex !== index
    })

    return showGroup!
  }

  async getAdvertUrl(): Promise<string> {
    await this.advertsPromise
    if (this.adverts.length === 0) {
      return Promise.reject('No more adverts available...')
    }
    const randomIndex = getRandomNumberBetween(0, this.adverts.length)
    const advert = this.adverts.at(randomIndex)
    this.adverts = this.adverts.filter((_, index) => {
      return randomIndex !== index
    })

    return advert!
  }

  async refetch(): Promise<void> {
    await this.showGroupsPromise
    await this.advertsPromise

    this.showGroups = this.showGroupsCache.filter(() => true)
    this.adverts = this.advertsCache.filter(() => true)
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
