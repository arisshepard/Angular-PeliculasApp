import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { ActorDetailsResponse } from '../../interfaces/actor-details-response';
import { Location } from '@angular/common';
import { CastActor } from '../../interfaces/actor-credits-response';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  details: ActorDetailsResponse;
  cast: CastActor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    // console.log('ID del actor: ', id);

    this.peliculasService
      .getActorDetails(id)
      .subscribe((details: ActorDetailsResponse) => {
        // console.log('Los datos del actor: ', details);
        this.details = details;
      });

    this.peliculasService.getActorCredits(id).subscribe((cast: CastActor[]) => {
      // console.log('Otras apariciones: ', cast);

      this.cast = cast;
    });
  }

  onBack(): void {
    this.location.back();
  }
}
