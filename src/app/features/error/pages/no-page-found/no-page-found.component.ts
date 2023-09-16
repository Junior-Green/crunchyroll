import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'cr-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.scss']
})
export class NoPageFoundComponent {
    constructor(title: Title) {
      title.setTitle('Not Found')
    }
}
