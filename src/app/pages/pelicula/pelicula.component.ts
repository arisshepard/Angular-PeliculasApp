import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetailsResponse } from '../../interfaces/movie-details-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public details: MovieDetailsResponse;
  public cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lo que se le pase como argumento no va a cambiar, así que
    // para eso se puede usar un snapshot
    // const id = this.activatedRoute.snapshot.params.id;
    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.peliculasService.getMovieDetails(id),
      this.peliculasService.getCast(id),
    ]).subscribe(([detalles, cast]) => {
      if (!detalles) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.details = detalles;
      this.cast = cast.filter((actor: Cast) => actor.profile_path != null);
    });

    // this.peliculasService
    //   .getMovieDetails(id)
    //   .subscribe((detalles: MovieDetailsResponse) => {
    //     // console.log('Detalles: ', detalles);
    //     if (!detalles) {
    //       this.router.navigateByUrl('/home');
    //       return;
    //     }
    //     this.details = detalles;
    //   });

    // this.peliculasService.getCast(id).subscribe((cast: Cast[]) => {
    //   this.cast = cast.filter((actor: Cast) => actor.profile_path != null);
    // });
  }

  onBack(): void {
    this.location.back();
  }
}
