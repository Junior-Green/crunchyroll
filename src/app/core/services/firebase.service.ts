
import { Injectable, OnDestroy } from '@angular/core';
import { Unsubscribe, User, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { DocumentReference, Timestamp, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage"
import { firebaseApp } from 'src/main';
import Show from '../models/show.model';
import { environment } from 'src/environments/environment';
import { convertToSlug } from '../utils/helpers';
import ShowImages from '../models/show-images.model';
import ShowGroup from '../models/show-group.model';
import Review from '../models/review.model';
import ReviewFormModel from '../models/review-form.model';
import { uuidv4 } from '@firebase/util';

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

  currentUserId(): string | null {
    return this.authenticated?.uid ?? null
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
      throw new Error('This method is not be allowed to be invoked in production build')
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

  async postReview(reviewForm: ReviewFormModel, showId: string): Promise<boolean> {
    const showRef = doc(this.firestore, 'shows', showId)

    if (this.authenticated === null) {
      return false
    }

    if (reviewForm.rating === null) {
      return false
    }

    const review: Review = {
      content: reviewForm.content,
      date: Timestamp.now(),
      id: uuidv4(),
      rating: reviewForm.rating,
      title: reviewForm.title,
      author: this.authenticated.uid,
      likes: 0,
      dislikes: 0,
      submitted: []
    }

    return updateDoc(showRef, {
      reviews: arrayUnion(review)
    })
      .then(() => {
        return true
      }, () => {
        return false;
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
          publisher: showData['publisher'],
          reviews: showData['reviews'],
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

  async updateFeedback(showId: string, review: Review, helpful: boolean): Promise<boolean> {
    if (this.authenticated === null) return false;

    const showRef = doc(this.firestore, 'shows', showId)

    return updateDoc(showRef, {
      reviews: arrayUnion({
        ...review,
        submitted: review.submitted.concat({
          userId: this.authenticated.uid,
          helpful: helpful
        }),
        likes: helpful ? (review.likes + 1) : review.likes,
        dislikes: helpful ? review.dislikes : (review.dislikes + 1)
      })
    }).then((_) => {
      return updateDoc(showRef, {
        reviews: arrayRemove(review)
      }).then(() => {
        return true
      }, () => {
        return false;
      })
    }, () => {
      return false
    })
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

  async getAllShows(): Promise<Show[]> {
    const shows: Show[] = []
    const querySnapshot = await getDocs(collection(this.firestore, "shows"));
    for await (const doc of querySnapshot.docs) {
      const data = doc.data()

      const show: Show = {
        showId: doc.id,
        title: data['title'],
        audio: data['audio'],
        description: data['description'],
        dub: data['dub'],
        sub: data['sub'],
        subtitles: data['subtitles'],
        genres: data['genres'],
        reviews: data['reviews'],
        publisher: data['publisher'],
        imageUrls: await this.getShowImages(doc.id)
      }

      shows.push(show);
    }
    
    return shows
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
        publisher: showData['publisher'],
        reviews: showData['reviews'],
      }

      return {
        ...showObj,
        imageUrls: await this.getShowImages(showObj.showId)
      }

    } else {
      return Promise.reject("Show does not exist");
    }
  }

  async getShowGroups(): Promise<ShowGroup[]> {
    const q = query(collection(this.firestore, "landing-show-groups"))
    const querySnapshot = await getDocs(q)
    const showGroups: ShowGroup[] = []
    const cache: Map<string, Show> = new Map<string, Show>()

    for await (const doc of querySnapshot.docs) {
      const data = doc.data()
      const showRefs: DocumentReference[] = data['shows']

      await Promise.all(showRefs.map<Promise<Show>>(async (ref) => {
        if (cache.has(ref.id)) {
          return cache.get(ref.id)!
        }

        const showSnap = await getDoc(ref)
        const showData = showSnap.data()

        if (showData === undefined) {
          return Promise.reject('Error retrieving data')
        }

        const show: Show = {
          showId: ref.id,
          title: showData['title'],
          audio: showData['audio'],
          description: showData['description'],
          dub: showData['dub'],
          sub: showData['sub'],
          subtitles: showData['subtitles'],
          genres: showData['genres'],
          reviews: showData['reviews'],
          publisher: showData['publisher'],
          imageUrls: await this.getShowImages(ref.id)
        }
        cache.set(ref.id, show)
        return show
      })).then((shows) => {
        showGroups.push({
          title: data['title'],
          subtitle: data['subtitle'],
          shows: shows,
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    return showGroups
  }

  async getLandingAdverts(): Promise<string[]> {
    const advertsRef = ref(this.storage, 'adverts')

    return Promise.all(await listAll(advertsRef).then((res) => {
      return res.items.map((advert) => {
        return getDownloadURL(advert)
      })
    }))

  }

  ngOnDestroy(): void {
    this.unsub()
  }
}
