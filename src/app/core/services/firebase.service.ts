
import { Injectable, OnDestroy } from '@angular/core';
import { Unsubscribe, User, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, getDoc, getFirestore, onSnapshot, setDoc } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { firebaseApp } from 'src/main';
import { Show } from '../models/show.model';
import { environment } from 'src/environments/environment';
import { convertToSlug } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {
  private auth = getAuth(firebaseApp);
  private firestore = getFirestore(firebaseApp);
  private storage = getStorage(firebaseApp);
  private firestoreUsersCollectionName = 'users'
  private authenticated: User | null = null;
  private unsub: Unsubscribe;

  constructor() {
    this.auth = getAuth(firebaseApp);
    this.firestore = getFirestore(firebaseApp);
    this.storage = getStorage(firebaseApp);
    this.unsub = this.auth.onAuthStateChanged((user) => {
      this.authenticated = user
    })
  }

  subscribeToAuthState(callback: (isLoggedIn: boolean) => void): Unsubscribe {
    return this.auth.onAuthStateChanged((user) => callback(user !== null))
  }

  subscribeToPremiumState(callback: (isPremium: boolean) => void): Unsubscribe | null {
    if (this.authenticated === null) {
      return null
    }

    return onSnapshot(doc(this.firestore, this.firestoreUsersCollectionName, this.authenticated.uid), (doc) => {
      const data = doc.data()
      callback(data && data['premium'])
    })
  }

  async isPremium(): Promise<boolean> {
    if (this.authenticated === null) {
      return false;
    }

    const docRef = doc(this.firestore, this.firestoreUsersCollectionName, this.authenticated.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const doc = docSnap.data();
      return doc['premium']
    } else {
      return false
    }
  }

  isLoggedIn(): boolean {
    return this.authenticated !== null
  }

  signOut(): Promise<void> {
    return this.auth.signOut()
  }

  async registerAccount(email: string, password: string): Promise<boolean> {
    const user = await createUserWithEmailAndPassword(this.auth, email, password)
      .catch((err) => {
        console.log(err)
        return null
      })

    if (user === null) {
      return Promise.reject('Account already exists')
    }

    return await setDoc(doc(this.firestore, 'users', user.user.uid), {
      premium: false
    })
      .then(() => true)
      .catch((err) => {
        console.log(err)
        return Promise.reject('Error initialising user data')
      })
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  addShow(show: Show): void {
    if (environment.production) {
      throw new Error('This method should not be allowed to be invoked in production')
    }
    
    setDoc(doc(this.firestore, 'shows', convertToSlug(show.title)), {
      ...show,
      lastUpdated: Timestamp.now()
    }).catch((err) => {
      console.error(err)
    })
  }

  async upgradeToPremium(): Promise<void> {
    if (this.authenticated === null) {
      return Promise.reject("No current user session");
    }
    else if (await this.isPremium()) {
      return Promise.reject("Already subscribed");
    }

    return setDoc(doc(this.firestore, 'users', this.authenticated.uid), {
      premium: true
    }).catch((err) => {
      console.log(err)
      return Promise.reject('Error initialising user data')
    })
  }

  ngOnDestroy(): void {
    this.unsub()
  }
}
