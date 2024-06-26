export interface MovieSearch {
    query: string
    page: number
}

export interface MovieSearchResult {
    page: number
    total_pages: number
    total_results: number
    results: Movie[]
}

export interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface MovieInformationGenre {
    id: number
    name: string
}

export interface MovieInformationProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface MovieInformationProductionCountry {
    iso_3166_1: string
    name: string
}

export interface MovieInformationSpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieInformation {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: string
    budget: number
    genres: MovieInformationGenre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: MovieInformationProductionCompany[]
    production_countries: MovieInformationProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: MovieInformationSpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
