import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];

  private slider: Swiper;

  constructor() {}

  ngAfterViewInit(): void {
    // console.log(this.movies.length);

    this.slider = new Swiper('.swiper-container', {
      // Optional parameters
      // direction: 'vertical',
      loop: true,

      // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      // },

      // // Navigation arrows
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },

      // // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    });

    this.slider.slideNext();
  }

  ngOnInit(): void {
    // console.log('Pelis en slide: ', this.movies);
  }

  onSlideNext(): void {
    this.slider.slideNext();
  }
  onSlidePrev(): void {
    this.slider.slidePrev();
  }
}
