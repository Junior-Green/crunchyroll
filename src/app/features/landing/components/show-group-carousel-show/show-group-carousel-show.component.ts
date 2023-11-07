import { Component, Input } from '@angular/core';
import Show from 'src/app/core/models/show.model';

@Component({
  selector: 'cr-show-group-carousel-show',
  templateUrl: './show-group-carousel-show.component.html',
  styleUrls: ['./show-group-carousel-show.component.scss']
})
export class ShowGroupCarouselShowComponent {
  @Input() show!: Show;
  
}
