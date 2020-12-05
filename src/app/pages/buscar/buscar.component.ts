import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  public moviesEncontradas: Movie[];
  public texto: string;

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

      this.activatedRoute.params.subscribe((params) => {
        // console.log(params);
        this.texto = params.texto;

        this.peliculasService
          .search(params.texto)
          .subscribe((movies: Movie[]) => {
            this.moviesEncontradas.push(...movies);
          });
      });
    }
    // console.log({ posicion, max });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService
  ) {}

  ngOnDestroy(): void {
    this.peliculasService.resetPage();
  }

  ngOnInit(): void {
    // this.peliculasService.carteleraPage = 1;

    this.activatedRoute.params.subscribe((params) => {
      // console.log(params);
      this.texto = params.texto;

      this.peliculasService
        .search(params.texto)
        .subscribe((movies: Movie[]) => {
          this.moviesEncontradas = movies;
        });
    });
  }
}
