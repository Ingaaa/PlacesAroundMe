import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Common } from '../common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  googleMapsService;
  places = [];
  locationSubscription;
  searchSubscription;
  loaded: boolean = false;

  constructor(
    private service: AppService,
    private common: Common
  ) { }

  ngOnInit() {
    this.googleMapsService = new google.maps.places.PlacesService(document.createElement('div'));
    this.locationSubscription = this.service.getLocation(false).subscribe(function () {
      this.searchSubscription = this.service.searchPlaces(this.googleMapsService, {
        location: this.common.location,
        radius: '500',
        type: ['point_of_interest'],
        rankby: 'prominence'
      }).subscribe(function (data) {
        this.places = data;
        this.loaded = true;
        console.log(data);
      }.bind(this))
    }.bind(this))
  }

  getPhoto(place) {
    if (place.photos) {
      return place.photos[0].getUrl({ maxWidth: 140 });
    } else {
      return place.icon;
    }
  }
}
