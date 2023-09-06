
import { Injectable } from '@angular/core';
import { app } from 'src/app/app.module';
import { Unsubscribe, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = getAuth(app);
  private firestore = getFirestore(app);
  private storage = getStorage(app);

  constructor() {
  }

  getAuthState(fn: (isLoggedIn: boolean) => void): Unsubscribe {
    return this.auth.onAuthStateChanged((user) => fn(user !== null))
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser !== null
  }

  signOut(): Promise<void> {
    return this.auth.signOut()
  }

  registerAccount(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
  }
}
