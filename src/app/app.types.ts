export interface Movie {
    id: number;
    original_language: string;
    title: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
    poster_path: string;
    genre_ids: number[];
  }

export interface Genre {
    id: number;
    name: string;
}

export interface Page {
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
}
