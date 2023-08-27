
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { app } from 'src/app/app.module';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {
  private auth = getAuth(app);
  private firestore = getFirestore(app);
  private storage = getStorage(app);
  private authStateStream: Observable<boolean>;
  private authStateSubscriber: Subscriber<boolean> | undefined;
  private unsubscribe;

  constructor() {
    this.authStateStream = new Observable<boolean>((subscriber) => {
      this.authStateSubscriber = subscriber
    })
    this.unsubscribe = this.auth.onAuthStateChanged((user) => {
      if (this.authStateSubscriber) {
        this.authStateSubscriber.next(user !== null)
      }
    })

  }

  getAuthState(): Observable<boolean> {
    return this.authStateStream
  }

  ngOnDestroy(): void {
    this.unsubscribe()
    this.authStateSubscriber?.complete()
  }

}
