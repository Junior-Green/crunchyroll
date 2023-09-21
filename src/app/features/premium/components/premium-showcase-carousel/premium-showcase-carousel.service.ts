import { Injectable } from '@angular/core';
import Show from 'src/app/core/models/show.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PremiumShowcaseCarouselService {

  constructor(private firebase: FirebaseService) { }

  async getShows(): Promise<Show[]> {
    return this.firebase.getShowCollection('premium-showcase')
  }
}
