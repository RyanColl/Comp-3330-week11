import { Component } from '@angular/core';
import { MovieServices } from './app.movie.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MovieServices]
})
export class AppComponent {
  title = 'hw6';
}
