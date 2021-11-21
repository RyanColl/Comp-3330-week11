import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Movie } from '../app.types';

@Component({
  selector: 'movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
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
})
export class MovieModalComponent implements OnInit {
  @Input() closable = true;
  @Input() visible!: boolean;
  @Input() currentMovie!: Movie;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() currentMovieChange: EventEmitter<Movie> = new EventEmitter<Movie>();

  constructor() {}

  ngOnInit() {

  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}