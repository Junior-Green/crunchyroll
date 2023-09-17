import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as firebase from 'firebase/app';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { getPerformance } from "firebase/performance";

if (environment.production) {
  enableProdMode()
}

export const firebaseApp = firebase.initializeApp(environment.firebaseConfig)

const perf = getPerformance(firebaseApp);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
