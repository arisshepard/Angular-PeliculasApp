import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CastActor } from '../../interfaces/actor-credits-response';
import Swiper from 'swiper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-cast-slideshow',
  templateUrl: './actor-cast-slideshow.component.html',
  styleUrls: ['./actor-cast-slideshow.component.css'],
})
export class ActorCastSlideshowComponent implements OnInit, AfterViewInit {
  @Input() cast: CastActor;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15,
      direction: 'horizontal',
    });
  }

  ngOnInit(): void {
    console.log('Cast: ', this.cast);
  }

  onMovieClick(id: string): void {
    this.router.navigate(['/pelicula', id]);
  }
}
