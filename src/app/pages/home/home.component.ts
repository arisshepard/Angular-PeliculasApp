import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { CarteleraResponse, Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const posicion =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (posicion > max) {
      // TODO: llamar servicio

      if (this.peliculasService.cargando) {
        return;
      }

      this.peliculasService.getNowPlaying().subscribe((movies: Movie[]) => {
        this.movies.push(...movies);
      });
    }
    // console.log({ posicion, max });
  }

  constructor(private peliculasService: PeliculasService) {}

  ngOnDestroy(): void {
    this.peliculasService.resetPage();
  }

  ngOnInit(): void {
    // this.peliculasService.carteleraPage = 1;

    this.peliculasService.getNowPlaying().subscribe((peliculas: Movie[]) => {
      // console.log('Cartelera en home: ', peliculas);
      this.movies = peliculas;
      this.moviesSlideShow = peliculas;
    });
  }
}
