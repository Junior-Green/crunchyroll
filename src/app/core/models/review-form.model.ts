export default interface ReviewFormModel {
    rating: 1 | 2 | 3 | 4 | 5 | null,
    title: string,
    content: string
}