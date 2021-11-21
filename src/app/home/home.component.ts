import { Component, OnInit } from '@angular/core';
import { MovieServices } from '../app.movie.services';
import { Genre, Movie, Page } from '../app.types';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MovieServices]
})

export class HomeComponent implements OnInit {
  Pages:Page[] = [];
  services!: MovieServices;
  Movies: Movie[] = []; displayedMovies: Movie[] = [];
  Page!: Page; pageCount: number = 1;
  Genres: Genre[] = []; currentGenre!: Genre;
  showCard: boolean = false; currentMovie!: Movie;
  constructor(MovieServices: MovieServices) {
    this.services = MovieServices;
  }
  ngOnInit(): void {
    this.services.awaitGenres().then(genres => {
      this.Genres = genres
    }).then(() => {
      for (let i = 0; i < 10; i++) {
        fetch(`${this.services.api}&page=${i+1}`)
          .then((data) => data.json())
          .then((page) => {
            this.Pages = [...this.Pages, ...[page]]
            this.Movies = [...this.Movies, ...page.results]
            this.displayedMovies = this.Pages[0].results
            console.log(this.displayedMovies)
          })
          .catch((e) => (this.services.error = e));
      }
    })
  }

  /* page interactions */
  pageUp(){
    if(this.pageCount>=10){return}
    this.pageCount = this.pageCount + 1
  }
  pageDown(){
    if(this.pageCount<=1){return}
    this.pageCount = this.pageCount - 1
  }
  displayGenre(genre: string) {
    
  }
  showMovie(id: number) {
    this.showCard = !this.showCard
    if(this.showCard) {
      let [currentMovie] = this.Movies.filter((movie: Movie) => {
        return movie.id === id
      })
      this.currentMovie = currentMovie;
      console.log(this.currentMovie)
    }
  }

}


