import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Common } from '../common';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  placesService: google.maps.places.PlacesService;
  places: google.maps.places.PlaceResult[];
  loaded: boolean = false;
  locationSubscription: ISubscription;
  searchSubscription;

  constructor(
    private service: AppService,
    private common: Common
  ) { }

  ngOnInit() {
    this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    this.locationSubscription = this.service.getLocation(false).subscribe({
      next: function () {
        this.searchSubscription = this.service.searchPlaces(this.placesService, {
          location: this.common.location,
          radius: '500',
          type: ['point_of_interest'],
          rankby: 'prominence'
        }).subscribe({
          next: function (data) {
            this.places = data;
            this.loaded = true;
            console.log(data);
          }.bind(this), error: function () { }, complete: function () { }
        })
      }.bind(this), error: function () { }, complete: function () { }
    })
  }

  getPhoto(place) {
    if (place.photos) {
      return place.photos[0].getUrl({ maxWidth: 140 });
    } else {
      return place.icon;
    }
  }
}
