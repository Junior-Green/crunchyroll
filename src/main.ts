import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as firebase from 'firebase/app';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

if (environment.production) {
  enableProdMode()
}

export const firebaseApp = firebase.initializeApp(environment.firebaseConfig)
getAuth(firebaseApp);
getFirestore(firebaseApp);
getStorage(firebaseApp);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
