import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Cast } from '../../interfaces/credits-response';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css'],
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {
  @Input() cast: Cast;

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
    // console.log('Cast: ', this.cast);
  }

  onActorClick(id: number): void {
    this.router.navigate(['actor', id]);
  }
}
