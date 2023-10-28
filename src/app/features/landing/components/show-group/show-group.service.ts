import { Injectable } from '@angular/core';
import { ShowGroup } from 'src/app/core/models/show-group.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ShowGroupService {
  showGroups : ShowGroup[] = [];
  constructor(private firebase: FirebaseService) { 
    firebase.getShowGroups().then((group) => {
      this.showGroups = group;
      console.log(this.showGroups)
    })
  }
}
