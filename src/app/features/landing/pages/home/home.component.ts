import { Component, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Unsubscribe } from 'firebase/auth';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ShowGroupService } from '../../components/show-group/show-group.service';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  isPremium: boolean = false;
  pushShowGroups: boolean = true;
  private unsub: Unsubscribe | null = null

  constructor(title: Title, firebase: FirebaseService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private showGroupService: ShowGroupService) {
    title.setTitle('Crunchyroll - Watch Popular Anime & Read Manga Online');
    this.unsub = firebase.subscribeToPremiumState((premium) => {
      this.isPremium = premium;
    })
  }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'cr-crown', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/crown.svg')
    );
  }

  ngOnDestroy(): void {
    if (this.unsub) {
      this.unsub()
    }
  }
}
