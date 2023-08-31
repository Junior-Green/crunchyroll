import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenuDropdownComponent } from './components/menu-dropdown/menu-dropdown.component';
import { LoggedOutDropdownComponent } from './components/logged-out-dropdown/logged-out-dropdown.component';
import { LoggedInDropdownComponent } from './components/logged-in-dropdown/logged-in-dropdown.component';
import { FreeTrialPromptComponent } from './components/free-trial-prompt/free-trial-prompt.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './shells/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    MenuDropdownComponent,
    LoggedOutDropdownComponent,
    LoggedInDropdownComponent,
    FreeTrialPromptComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [NavBarComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
