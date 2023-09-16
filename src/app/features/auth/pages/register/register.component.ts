import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthFormModel } from 'src/app/core/models/auth-form.model';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'cr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  checkboxState: boolean = false;
  showPassword: boolean = false;
  loading = false;
  showError: boolean = false;
  errorMessage: string = ""

  formData: AuthFormModel = {
    email: '',
    password: '',
    subscribeToNewsletter: false
  }

  constructor(titleService: Title, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private firebase: FirebaseService, private router: Router) {
    titleService.setTitle('Registration');
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'cr-checkmark', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/checkmark.svg')
    );
  }

  toggleAlert() {
    this.showError = !this.showError
  }

  registerAccount() {
    this.showError = false
    this.firebase.registerAccount(this.formData.email, this.formData.password).then((res) => {
      res && this.router.navigate(['/'])
    }).catch((error) => {
      this.errorMessage = error
      this.showError = true
    }).finally(() => {
      this.loading = false;

      this.formData = {
        email: '',
        password: '',
        subscribeToNewsletter: false
      }
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleCheckbox() {
    this.checkboxState = !this.checkboxState
    this.formData.subscribeToNewsletter = this.checkboxState
  }
}
