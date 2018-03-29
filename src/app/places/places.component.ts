import { Component, OnInit } from '@angular/core';
import { Common } from '../common';
import { AppService } from '../app.service';
import {} from '@types/googlemaps';
import {Router} from "@angular/router";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  search = {};
  map: google.maps.Map;
  googleAutocompleteService: google.maps.places.Autocomplete;
  googleMapsService: google.maps.places.PlacesService;
  geo: google.maps.Geocoder;
  marker: google.maps.Marker;
  places = [];
  categories = [];
  openOptions = [
    { value: true, title: "Jā" },
    { value: false, title: "Nē" }
  ];
  pinColor = "FE7569";
  pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34));
  pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
    new google.maps.Size(40, 37),
    new google.maps.Point(0, 0),
    new google.maps.Point(12, 35));


  constructor(
    private common: Common,
    private service: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.geo = new google.maps.Geocoder();
    this.googleAutocompleteService = new google.maps.places.Autocomplete(document.getElementById('location'))

    this.service.getLocation(function () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.common.location,
        zoom: 15
      });

      this.marker = new google.maps.Marker({ map: this.map, position: this.common.location, title: "Esmu te!" });

      this.googleMapsService = new google.maps.places.PlacesService(this.map);
      //this.showPlaces();

      this.geo.geocode({
        location: this.common.location
      }, function (data) {
        this.search.location = data[0].formatted_address;
        console.log(data);
      }.bind(this));
    }.bind(this));
    this.categories = this.common.categories;
  }

  /*showPlaces() {
    this.googleMapsService.nearbySearch({
      location: this.common.location,
      radius: '500',
      type: ['point_of_interest'],
      rankby: 'prominence',
      language: 'lat'
    }, this.callback.bind(this));
  }*/

  callback(data) {
    this.places = data;
    for (var i = 0; i < this.places.length; i++) {
      new google.maps.Marker({ map: this.map, position: this.places[i].geometry.location, icon: 'https://mt.google.com/vt/icon?psize=30&color=ff304C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=%E2%80%A2' });
    }
    console.log(data);
  }

  searchPlaces() {
    var body = Object.assign({}, this.search);
    console.log(body);
    console.log(this.googleAutocompleteService.getPlace());
    body.location = this.common.location;
    body.radius = '500';
    this.googleMapsService.nearbySearch(body, this.callback.bind(this));
  }

  openPlace() {
    this.router.navigate(['search']);
  }

}
