import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../interfaces/cartelera-response';

@Pipe({
  name: 'poster',
})
export class PosterPipe implements PipeTransform {
  // https://image.tmdb.org/t/p/w500{{ movie.poster_path }}
  transform(poster: string): string {
    if (poster) {
      return `https://image.tmdb.org/t/p/w500${poster}`;
    } else {
      return './assets/img/no-image.jpg';
    }

    // return poster;
  }
}
