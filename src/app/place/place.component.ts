import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Common } from '../common';
import { AppService } from '../app.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  googleMapsService: google.maps.places.PlacesService;
  id;
  placeSubscription;
  place = <any>{};

  constructor(
    private route: ActivatedRoute,
    private common: Common,
    private service: AppService,
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.googleMapsService = new google.maps.places.PlacesService(document.createElement('div'));
    this.placeSubscription = this.service.getPlaceDetails(this.googleMapsService, { placeId: this.id, language: "lv" })
      .subscribe(this.callback.bind(this));
  }

  callback(data) {
    console.log(data);
    this.place = data;
  }

}
