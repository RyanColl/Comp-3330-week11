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
  title = 'Movies'; pageTotal = 10;
  Pages:Page[] = [];
  services!: MovieServices;
  Movies: Movie[] = []; displayedMovies: Movie[] = [];
  Page!: Page; pageCount: number = 1;
  Genres: Genre[] = []; currentGenre!: Genre;
  showCard: boolean = false; currentMovie!: Movie;
  selected = 'option2'; displayedPages: Page[] = [];
  constructor(MovieServices: MovieServices) {
    this.services = MovieServices;
  }
  ngOnInit(): void {
    this.services.awaitGenres().then(genres => {
      this.Genres = genres
      console.log(this.Genres)
    }).then(() => {
      this.services.awaitPages().then(pages => {
        //@ts-ignore
        this.Pages = pages
        this.Pages.forEach((page: Page) => {
          this.Movies = [...this.Movies, ...page.results]
        })
        this.pageTotal = this.Pages.length
      })
    })
  }

  /* page interactions */
  pageUp(){
    if(this.displayedPages.length>0) {
      console.log(this.pageCount, this.pageTotal)
      if(this.pageCount >= this.pageTotal) {
        return
      }
    }
    if(this.pageCount>=10){return}
    this.pageCount = this.pageCount + 1
  }
  pageDown(){
    if(this.pageCount<=1){return}
    this.pageCount = this.pageCount - 1
  }
  displayGenre(genre: Genre) {
    this.pageCount = 1;
    this.currentGenre = genre
    this.displayedMovies = this.Movies.filter((movie: Movie) => {
      return movie.genre_ids.includes(genre.id)
    })
    const pages: Page[] = []
    let page: Page = {
      page: 1,
      totalPages: 0,
      totalResults: 0,
      results: []
    }
    
    this.displayedMovies.forEach((movie: Movie, i: number) => {
      if(i%20===0 && i!==0) {
        pages.push(page)
        page = {...page, results: []}
      }
      page = {...page, ...{
        page: ((~~(i/20))+1),
        totalPages: 0,
        totalResults: 0,
        results: [...page.results, movie]
      }}
      if(i+1 === this.displayedMovies.length) {
        console.log('here',page)
        pages.push(page)
        return;
      }
      
    })  
    this.displayedPages = pages
    this.pageTotal = this.displayedPages.length
    console.log(`pagelength: ${this.displayedPages.length}, movielength: ${this.displayedMovies.length}`)
  }
  showMovie(id: number) {
    this.showCard = !this.showCard
    if(this.showCard) {
      let [currentMovie] = this.Movies.filter((movie: Movie) => {
        return movie.id === id
      })
      this.currentMovie = currentMovie;
    }
  }
  displayAll() {
    this.displayedPages = []
    this.displayedMovies = []
    this.pageTotal = this.Pages.length
    this.pageCount = 1;
  }
}


