declare interface ImageData {
    poster_path: string
    backdrop_path: string
    id: number
    title: string
    adult:boolean
    original_language: string
    original_title:string
    release_date: string
    vote_average: number
    vote_count: number
    overview:string
    popularity: number
    genre_ids: [number]
}
declare interface ResponseData {
    page: number
    total_results: number
    total_pages:number
    results: ImageData[]
}