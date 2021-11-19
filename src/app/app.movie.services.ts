import { Movie, Page } from "./app.types";

export class MovieServices {
  api =
    'https://api.themoviedb.org/3/discover/movie?api_key=8b11459382e47f442aaf2d04e56fd17d&language=en-US&sort_by=popularity.desc&include_video=true';
  error!: any;
  private Pages: Page[] = [];
  private awaitPages(): Promise<Page[]> {
    return new Promise((res, rej) => {
      let pages: Page[] = [];
      for (let i = 0; i < 10; i++) {
        fetch(`${this.api}&page=${i + 1}`)
          .then((data) => data.json())
          .then((result) => pages.push(result))
          .catch((e) => (this.error = e));
          res(pages)
      }
    })
  }
  public getPages(): Promise<Page[]> {
      return this.awaitPages().then((pages: Page[]) => {
        return(pages);
      })
  }
  public getMovies() {
    return this.awaitPages().then((pages: Page[]) => {
      return [...pages.map((page: Page)=>page.results)]
    })
  }
}