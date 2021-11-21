import { Genre, Movie, Page } from "./app.types";

export class MovieServices {
  public api =
    'https://api.themoviedb.org/3/discover/movie?api_key=8b11459382e47f442aaf2d04e56fd17d&language=en-US&sort_by=popularity.desc&include_video=true';
  public error!: any;
  private genreApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=8b11459382e47f442aaf2d04e56fd17d&language=en-US'
  // private Pages: Page[] = [];
  public awaitGenres(): Promise<Genre[]> {
    return new Promise((res, rej) => {
      fetch(this.genreApi)
          .then((data) => data.json())
          .then((result) => {
            res(result.genres)
          })
          .catch((e) => (this.error = e));
    })
  }
}