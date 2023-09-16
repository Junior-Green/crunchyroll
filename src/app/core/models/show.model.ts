import { Timestamp } from "firebase/firestore"

export interface Show {
    title: string,
    audio: string[],
    description: string,
    dub: boolean,
    sub: boolean,
    subtitles: string[],
    genres: ("Action" | "Adventure" | "Comedy" | "Drama" | "Fantasy" | "Music" | "Romance" | "Sci-Fi" | "Seinen" | "Shojo" | "Shonen" | "Slice of life" | "Sports" | "Supernatural" | "Thriller")[],
    publisher: string,
    reviews?: {
        content: string,
        date: Timestamp,
        id: string,
        rating: 1 | 2 | 3 | 4 | 5,
        title: string
    }[],
}