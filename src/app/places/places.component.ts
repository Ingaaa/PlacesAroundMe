import { Component, OnInit } from '@angular/core';
import { Common } from '../common';
import { AppService } from '../app.service';

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
  places: google.maps.places.PlaceResult[];
  categories = this.common.categories;
  openOptions = this.common.openOptions;

  constructor(
    private common: Common,
    private service: AppService
  ) { }

  ngOnInit() {
    this.googleAutocompleteService = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('location'));

    this.service.getLocation(false).subscribe({
      next: this.setLocation,
      error: () => { },
      complete: () => { }
    });
  }

  setLocation = () => {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.common.location,
      zoom: 15
    });
    const marker = new google.maps.Marker({ map: this.map, position: this.common.location, title: 'Esmu te!' });
    this.googleMapsService = new google.maps.places.PlacesService(this.map);

    this.service.geoCode().subscribe({
      next: (data) => {
        this.search.location = data[0].formatted_address;
      },
      error: () => { },
      complete: () => { }
    });
  }

  searchPlaces() {
    const body = this.copyObject(this.search);
    if (this.googleAutocompleteService.getPlace() != null) {
      console.log(this.googleAutocompleteService.getPlace());
      body.location = this.googleAutocompleteService.getPlace().geometry.location;
    } else {
      body.location = this.common.location;
    }
    body.radius = 500;
    this.service.searchPlaces(this.googleMapsService, body).subscribe({
      next: this.setPlaces,
      error: () => { },
      complete: () => { }
    });
  }

  setPlaces = (data) => {
    this.places = data;
    for (let i = 0; i < this.places.length; i++) {
      const marker = new google.maps.Marker({
        map: this.map, position: this.places[i].geometry.location,
        icon: 'https://mt.google.com/vt/icon?psize=30&color=ff304C13&name=icons' +
          '/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=%E2%80%A2'
      });
    }
  }

  copyObject(object) {
    const newObj = <any>{};
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (object[key] != null && object[key] !== '') {
        newObj[key] = object[key];
      }
    }
    return newObj;
  }

  getPhoto(place) {
    if ((place.photos != null) && place.photos.length > 0) {
      return place.photos[0].getUrl({ maxWidth: 140 });
    }
  }
}
