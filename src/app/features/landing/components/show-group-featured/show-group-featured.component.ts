import { Component, HostListener, Input } from '@angular/core';
import { screenSizes } from 'src/app/core/constants/constants';
import Show from 'src/app/core/models/show.model';
import { ShowService } from 'src/app/core/services/show.service';

@Component({
  selector: 'cr-show-group-featured',
  templateUrl: './show-group-featured.component.html',
  styleUrls: ['./show-group-featured.component.scss']
})
export class ShowGroupFeaturedComponent {
  @Input() show!: Show

  constructor(private showService: ShowService) { }

  getShowDescriptor(show: Show): string {
    return this.showService.getShowDescriptor(show)
  }
}
