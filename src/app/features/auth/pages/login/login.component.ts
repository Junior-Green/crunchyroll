import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'cr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Login');
  }
}
