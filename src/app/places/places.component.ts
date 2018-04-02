import { Component, OnInit } from '@angular/core';
import { Common } from '../common';
import { AppService } from '../app.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  search = <any>{};
  map: google.maps.Map;
  googleAutocompleteService: google.maps.places.Autocomplete;
  googleMapsService: google.maps.places.PlacesService;
  marker: google.maps.Marker;
  places = [];
  categories = this.common.categories;
  openOptions = this.common.openOptions;
  locationSubscription;
  geoCodeSubscription;
  searchSubscription;

  constructor(
    private common: Common,
    private service: AppService
  ) { }

  ngOnInit() {
    this.googleAutocompleteService = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('location'))

    this.locationSubscription = this.service.getLocation(false).subscribe(function () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.common.location,
        zoom: 15
      });
      this.marker = new google.maps.Marker({ map: this.map, position: this.common.location, title: "Esmu te!" });
      this.googleMapsService = new google.maps.places.PlacesService(this.map);

      this.geoCodeSubscription = this.service.geoCode().subscribe(function (data) {
        this.search.location = data[0].formatted_address;
        console.log(data);
      }.bind(this))
    }.bind(this));
  }

  searchPlaces() {
    console.log(this.googleAutocompleteService.getPlace());
    var body = this.copyObject(this.search);
    if (this.googleAutocompleteService.getPlace() !== undefined) {
      body.location = this.googleAutocompleteService.getPlace().geometry.location;
    } else {
      body.location = this.common.location;
    }
    body.radius = '500';
    this.searchSubscription = this.service.searchPlaces(this.googleMapsService, body).subscribe(this.callback.bind(this));
  }

  callback(data) {
    console.log(data);
    this.places = data;
    for (var i = 0; i < this.places.length; i++) {
      new google.maps.Marker({ map: this.map, position: this.places[i].geometry.location, icon: 'https://mt.google.com/vt/icon?psize=30&color=ff304C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=%E2%80%A2' });
    }
  }

  copyObject(object) {
    var newObj = <any>{};
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (object[key] !== undefined && object[key] !== null && object[key] !== "") {
        newObj[key] = object[key];
      }
    }
    return newObj;
  }
}
