import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { AuthFormModel } from 'src/app/core/models/auth-form.model';

@Component({
  selector: 'cr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  checkboxState: boolean = false;
  showPassword: boolean = false;

  constructor(private titleService: Title, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    titleService.setTitle('Registration');
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'cr-checkmark', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/checkmark.svg')
    );
  }

  formData: AuthFormModel = {
    email: '',
    password: '',
    subscribeToNewsletter: false
  }

  registerAccount() {

  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleCheckbox() {
    this.checkboxState = !this.checkboxState
    this.formData.subscribeToNewsletter = this.checkboxState
  }
}
