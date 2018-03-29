import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {} from '@types/googlemaps';
import { Common } from '../common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  googleMapsService;
  places = [];
  imageSizes = {
    maxWidth: 140
  }
  request = {
    location: this.common.location,
    radius: '500',
    type: ['point_of_interest'],
    rankby: 'prominence',
    language: 'lat'
  };

  constructor(
    private service: AppService,
    private common: Common
  ) { }

  ngOnInit() {
    this.googleMapsService = new google.maps.places.PlacesService(document.createElement('div'));

    this.service.getLocation(function () {
      this.showPlaces();
    }.bind(this));
  }

  showPlaces() {
    console.log(this.request);
    this.googleMapsService.nearbySearch({
      location: this.common.location,
      radius: '500',
      type: ['point_of_interest'],
      rankby: 'prominence',
      language: 'lat'
    }, this.callback.bind(this));
  }

  callback(data) {
    this.places = data;
    console.log(data);
  };

  getPhoto(place) {
    if (place.photos) {
      return place.photos[0].getUrl(this.imageSizes);
    } else {
      return place.icon;
    }
  }

}
