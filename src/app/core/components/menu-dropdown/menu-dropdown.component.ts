import { Component } from '@angular/core';

@Component({
  selector: 'cr-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})
export class MenuDropdownComponent {
  menuDropdownShowing: boolean = false;

  games = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fanstasy',
    'Music',
    'Romance',
    'Sci-Fi',
    'Seinen',
    'Shojo',
    'Shonen',
    'Slice of life',
    'Sports',
    'Supernatural',
    'Thriller'
  ]

  constructor() {}


  menuDropdownHandler(state: 'onShown' | 'onHidden') {
    if (state === 'onShown') {
      this.menuDropdownShowing = true
    }
    else {
      this.menuDropdownShowing = false
    }
  }
}
