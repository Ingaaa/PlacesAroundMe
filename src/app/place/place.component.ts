import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Common } from '../common';
import { AppService } from '../app.service';
import { } from '@types/googlemaps';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  placesService: google.maps.places.PlacesService;
  place: google.maps.places.PlaceResult;
  map: google.maps.Map;
  id: string;
  placeSubscription;
  ratings: number[] = [1, 2, 3, 4, 5];
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private common: Common,
    private service: AppService
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('placeMap'), {
      center: this.common.location,
      zoom: 15
    });
    new google.maps.Marker({ map: this.map, position: this.common.location, title: "Esmu te!" });
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placeSubscription = this.service.getPlaceDetails(this.placesService, { placeId: this.id, language: "lv" })
      .subscribe(this.callback.bind(this));
  }

  callback(data) {
    console.log(data);

    this.place = data;
    new google.maps.Marker({ map: this.map, position: this.place.geometry.location, icon: 'https://mt.google.com/vt/icon?psize=30&color=ff304C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=%E2%80%A2' });



    //console.log("error");

    this.loaded = true;
    /* this.map = new google.maps.Map(document.getElementById('placeMap'), {
       center: this.common.location,
       zoom: 15
     });*/
  }

}
