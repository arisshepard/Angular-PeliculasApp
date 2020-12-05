import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';

import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../pipes/pipes.module';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';
import { ActorCastSlideshowComponent } from './actor-cast-slideshow/actor-cast-slideshow.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent,
    ActorCastSlideshowComponent,
  ],
  imports: [CommonModule, RouterModule, RatingModule, PipesModule],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideshowComponent,
    ActorCastSlideshowComponent,
  ],
})
export class ComponentsModule {}
