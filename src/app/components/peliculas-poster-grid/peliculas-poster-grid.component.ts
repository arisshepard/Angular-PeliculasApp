import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Movie, CarteleraResponse } from '../../interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css'],
})
export class PeliculasPosterGridComponent implements OnInit {
  @Input() movies: Movie[] = [];

  constructor(
    public peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.peliculasService
    //   .getNowPlaying()
    //   .subscribe((peliculas: CarteleraResponse) => {
    //     this.movies = peliculas.results;
    //   });

    // this.peliculasService.carteleraPage = 1;

    console.log(this.movies);
  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/pelicula', movie.id]);
  }

  // onRate($event: {
  //   oldValue: number;
  //   newValue: number;
  //   starRating: StarRatingComponent;
  // }) {
  //   alert(`Old Value:${$event.oldValue},
  //     New Value: ${$event.newValue},
  //     Checked Color: ${$event.starRating.checkedcolor},
  //     Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  // }
}
