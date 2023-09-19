import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthFormModel } from 'src/app/core/models/auth-form.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'cr-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  checkboxState: boolean = false;
  showPassword: boolean = false;
  loading = false;
  showError: boolean = false;
  errorMessage: string = ""

  formData: AuthFormModel = {
    email: '',
    password: '',
  }

  constructor(titleService: Title, private firebase: FirebaseService, private router: Router) {
    titleService.setTitle('Login');
  }

  toggleAlert(): void {
    this.showError = false
  }

  login() {
    this.showError = false
    this.firebase.signIn(this.formData.email, this.formData.password).then(() => {
      this.router.navigate(['../'])
    }).catch(() => {
      this.errorMessage = "Email or password is incorrrect."
      this.showError = true
    }).finally(() => {
      this.loading = false;

      this.formData = {
        email: '',
        password: '',
      }
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
