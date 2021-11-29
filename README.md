# COMP 3330 - Week 11 - Lab

Ryan Collicutt - A00888552 | https://complabs2.web.app

# Week 11

In week 11 we explored workign with API's in Angular. Because we are experienced with web-apps, we jumped right into pulling movie data from the IMBD API. Today I am going to cover the details of the assignment and what it is I have done here. I used the comman ```ng g c componentName``` for all of my components. This gives me a brand new folder in the app directory that comes with its own css, html, model and component files. 

# ES6 usage Examples

1. Class AppComponent from lines 10-12 of app.component.ts:
```js
export class AppComponent {
  title = 'hw6';
}
```

2. Arrow Function from a modal transition animation property from lines 9-19 of movie-modal.component.ts
```js
animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
```

3. Let from the declaration of a Page variable from lines 61-66 of home.component.ts
```js
let page: Page = {
      page: 1,
      totalPages: 0,
      totalResults: 0,
      results: []
    }
```

4. Const from the declaration of a Page array from line 60 of home.component.ts
```js
const pages: Page[] = []
```

5. Template Literal String inside of a console.log from line 88 of home.component.ts
```js
console.log(`pagelength: ${this.displayedPages.length}, movielength: ${this.displayedMovies.length}`)
```

6. Spread syntax inserting page information into a page object, and also movies into a movie array for each page, from lines 73-78 of home.component.ts
```js
page = {...page, ...{
        page: ((~~(i/20))+1),
        totalPages: 0,
        totalResults: 0,
        results: [...page.results, movie]
      }}
```

7. Modules from importing necessary modules from lines 1-3 of home.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { MovieServices } from '../app.movie.services';
import { Genre, Movie, Page } from '../app.types';
```

8. Destructuring in an import statement from line 3 of movie-modal.component.ts
```js
import { Movie } from '../app.types';
```

# How It Works

My experience with Angular this time was much better. Angular is suprisingly... nice to work with. At first, I thought because it followed a more object oriented structure, that it would be less attractive, as I am more of a functional programmer. But there is something nice about the way it integrates into html.

The movie list is pulled from the imbd database using their api's. I used interfaces to create types for each of the data type coming in. The following interfaces are necessary to make dealing with the data in typescript easy. 
app.types.ts
```js
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
```

These types give us insight into the pages we will see, and the data they will contain, like each page has a movie array. Using fetch, I create a file called app.movie.services.ts, which calls the movie data inside of a for loop, inserting it into an array, then returning the array through a promise. This was then received in the home.component.ts and assigned to the proper variables to keep the data for the app. 
app.movie.services
```js
export class MovieServices {
  public api =
    'https://api.themoviedb.org/3/discover/movie?api_key=yourapikeyhere&language=en-US&sort_by=popularity.desc&include_video=true';
  public error!: any;
  private genreApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=yourapikeyhere&language=en-US'
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
  public awaitPages() {
    const fn = (i: number) => {
      return new Promise((res, rej) => {
        fetch(`${this.api}&page=${i + 1}`).then((data) => data.json())
        .then((result) => {
          res(result)
        })
      })
    }
    return new Promise((res, rej) => {
      let pages: Page[] = []
      for(let i = 0; i<10; i++) {
         fn(i).then(r => {
           // @ts-ignore
          pages = [...pages, r] 
          if(i === 9) {
            console.log(pages) 
            res(pages)
          }         
         }) 
      }       
    }) 
  }
}
```

Once the data was in its correct variables in the home component, the movies would load into the web page. The movies were loaded in based on the Page array, and changing a page using the buttons would show the different movies on each page. Everything is dynamic, so when the imbd api fails to return us 10 pages, and only gives us 8, then our app does not fail or glitch out, it shows the correct number of pages. I also decided to use a modal that would popup on click with the selected movie and a more detailed description. 


# Genre 

The Genre dropdown was fun to implement. It allows you to filter through all of the movies as to which genre you choose. Pages displayed after using the Genre dropdown use different variables than pages regularly displayed. First, it filters through the displayed movies. Each movie has an array of genre ids, so we use an include inside of the filter to pull any movies whos included id's match in the selected genre id. Then, we create a page object we can use for filling with movies. We use spread syntax tospread the object through a loop, adding a movie to the page every time. Using ```(~~(i/20))```, we can ensure after the 200th, 40th, 60th... movie we have a new page. This means only 20 movies displayed on the page. The following logic is how this is completed. 
Lines 54-89 of home.component.ts
```js
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
```

# Design Architecture

This time, we are using routing with angular, so our app is very simple. I used the original navbar from the template that comes with a starter project, and I added routing underneath it. That way, my routing can be controlled from the nav bar.
```html
<nav></nav>
<router-outlet></router-outlet>
```

I have two routs inside my app. About and Home. Home is the movie list, and About is about me. In Home, My home component contains my movie modal component, and all of logic for the movie display. 
home.component.ts
```html
    <movie-modal  [(visible)]="showCard" [(currentMovie)]="currentMovie">
      <h1>Hello World</h1>
      <button (click)="showCard = !showCard" class="btn">Close</button>
    </movie-modal>
```

My app.movie.services.ts holds the logic in calling the api and returning the data in a promise. And my app.types.ts contains the type definitions for all of the object structure for the api data. 

Overall, I am proud of my app and would use angular again in the future.


# Hosted 
# @
# https://complabs2.web.app