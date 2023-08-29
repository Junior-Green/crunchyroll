import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shells/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './shells/footer/footer.component';
import { MenuDropdownComponent } from './components/menu-dropdown/menu-dropdown.component';
import { LoggedOutDropdownComponent } from './components/logged-out-dropdown/logged-out-dropdown.component';
import { LoggedInDropdownComponent } from './components/logged-in-dropdown/logged-in-dropdown.component';
import { FreeTrialPromptComponent } from './components/free-trial-prompt/free-trial-prompt.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuDropdownComponent,
    LoggedOutDropdownComponent,
    LoggedInDropdownComponent,
    FreeTrialPromptComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
