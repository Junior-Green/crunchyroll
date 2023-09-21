
import { Injectable, OnDestroy } from '@angular/core';
import { Unsubscribe, User, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { DocumentReference, Timestamp, doc, getDoc, getFirestore, onSnapshot, setDoc } from "firebase/firestore"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { firebaseApp } from 'src/main';
import Show from '../models/show.model';
import { environment } from 'src/environments/environment';
import { convertToSlug } from '../utils/helpers';
import ShowImages from '../models/show-images.model';

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

  async getShowCollection(collectionId: string): Promise<Show[]> {
    const docRef = doc(this.firestore, "collections", collectionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data()
      const showRefs: DocumentReference[] = data['shows']

      return Promise.all(showRefs.map<Promise<Show>>(async (ref) => {
        const showSnap = await getDoc(ref)
        const showData = showSnap.data()

        if (showData === undefined) {
          return Promise.reject('Error retrieving data')
        }

        const showObj: Omit<Show, 'imageUrls'> = {
          showId: ref.id,
          title: showData['title'],
          audio: showData['audio'],
          description: showData['description'],
          dub: showData['dub'],
          sub: showData['sub'],
          subtitles: showData['subtitles'],
          genres: showData['genres'],
          publisher: showData['publisher']
        }

        return {
          ...showObj,
          imageUrls: await this.getShowImages(showObj.showId)
        }
      }))
    } else {
      return Promise.reject("Collection does not exist");
    }
  }

  async getShowImages(showId: string): Promise<ShowImages> {
    const portraitCoverUrl: string = await getDownloadURL(ref(this.storage, `shows/${showId}/cover/portrait.jpe`))
    const landscapeCoverUrl: string = await getDownloadURL(ref(this.storage, `shows/${showId}/cover/landscape.jpe`))
    const logoUrl: string = await getDownloadURL(ref(this.storage, `shows/${showId}/logo/logo.webp`))

    return {
      covers: {
        portrait: portraitCoverUrl,
        landscape: landscapeCoverUrl
      },
      logo: logoUrl
    }
  }

  async getShow(showId: string): Promise<Show> {
    const docRef = doc(this.firestore, "shows", showId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const showData = docSnap.data()

      if (showData === undefined) {
        return Promise.reject('Error retrieving data')
      }

      const showObj: Omit<Show, 'imageUrls'> = {
        showId: docRef.id,
        title: showData['title'],
        audio: showData['audio'],
        description: showData['description'],
        dub: showData['dub'],
        sub: showData['sub'],
        subtitles: showData['subtitles'],
        genres: showData['genres'],
        publisher: showData['publisher']
      }

      return {
        ...showObj,
        imageUrls: await this.getShowImages(showObj.showId)
      }

    } else {
      return Promise.reject("Show does not exist");
    }
  }

  ngOnDestroy(): void {
    this.unsub()
  }
}
