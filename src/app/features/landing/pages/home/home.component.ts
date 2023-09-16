import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(title: Title){
      title.setTitle('Crunchyroll - Watch Popular Anime & Read Manga Online');
    }
}
