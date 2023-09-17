import { Timestamp } from "firebase/firestore";

export default interface Review {
    content: string,
    date: Timestamp,
    id: string,
    rating: 1 | 2 | 3 | 4 | 5,
    title: string,
    author: string,
}