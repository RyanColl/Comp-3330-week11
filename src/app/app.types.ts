export interface Movie {
    id: number;
    original_language: string;
    title: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
    poster_path: string;
    genreIds: number[];
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

export interface PageList {
    page1: Page;
    page2: Page;
    page3: Page;
    page4: Page;
    page5: Page;
    page6: Page;
    page7: Page;
    page8: Page;
    page9: Page;
    page10: Page;
}