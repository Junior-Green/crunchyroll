import { Component, ElementRef, OnDestroy, ViewChild, OnInit, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Unsubscribe } from 'firebase/auth';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ShowGroupService } from '../../components/show-group/show-group.service';
import { ShowGroupComponent } from '../../components/show-group/show-group.component';
import { debounce } from 'src/app/core/utils/helpers';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('showGroupsContainer', { read: ViewContainerRef, static: false })
  private showGroupsContainer: ViewContainerRef | undefined;
  @ViewChild('spinner', { read: ElementRef<HTMLDivElement>, static: false })
  private spinner: ElementRef<HTMLDivElement> | undefined;

  private unsub: Unsubscribe | null = null
  private scrollHandler: { (...args: any[]): void; (this: Window, ev: Event): any; (this: Window, ev: Event): any; } | undefined;
  isPremium: boolean = false;
  pushShowGroups: boolean = true;
  loading: boolean = false;


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

  ngAfterViewInit(): void {
    this.scrollHandler = debounce(async () => {
      if (this.loading || this.showGroupsContainer === undefined || this.spinner === undefined) {
        return
      }

      const scrollPosition = document.body.scrollTop + window.innerHeight;
      const spinnerPosition = this.spinner.nativeElement.offsetTop
      const showGroupsRemaining: number = await this.showGroupService.showGroupsRemaining()

      if (scrollPosition >= spinnerPosition && showGroupsRemaining >= 1) {
        this.pushShowGroups = true
        this.showGroupsContainer.createComponent(ShowGroupComponent)
      }
      else if (showGroupsRemaining < 1) {
        this.pushShowGroups = false
      }
    }, 500).bind(this)

    window.addEventListener('scroll', this.scrollHandler, true);
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler,true)
    }

    this.showGroupService.refetch()

    if (this.unsub) {
      this.unsub()
    }
  }
}
