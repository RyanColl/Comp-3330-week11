import { Component, OnInit } from '@angular/core';
import { MovieServices } from '../app.movie.services';
import { Movie, Page, PageList } from '../app.types';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MovieServices]
})

export class HomeComponent implements OnInit {
  Movies: Movie[] = []
  result!:any; 
  error!:any;
  pageList!: PageList;
  Pages:Page[] = [];
  services!: MovieServices;
  constructor(MovieServices: MovieServices) {
    this.services = MovieServices;
  }


  ngOnInit(): void {
    this.services.getPages()
      .then((pages: Page[]) => {
        this.Pages = pages
      })
  }
}


