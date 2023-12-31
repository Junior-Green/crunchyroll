import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingModule } from './features/landing/landing.module';
import { AppComponent } from './app.component';
import { ErrorModule } from './features/error/error.module';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ErrorModule,
    CoreModule,
    LandingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
