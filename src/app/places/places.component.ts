import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../common';
import { AppService } from '../services/app.service';

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
  isCollapsed = true;
  loading = false;
  submitted = false;
  loadMore = true;
  getNextPage;

  constructor(
    private common: Common,
    private service: AppService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.googleAutocompleteService = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('location'));
    this.search.query = this.route.snapshot.paramMap.get('query');
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.common.getLocation(),
      zoom: 15
    });
    this.googleMapsService = new google.maps.places.PlacesService(this.map);
    if (this.search.query) {
      this.searchPlaces();
    }
  }

  getLocation() {
    this.service.getLocation(true)({
      next: this.setLocation,
      error: () => { },
      complete: () => { }
    });
  }

  setLocation = () => {
    this.map.setCenter(this.common.location);
    const marker = new google.maps.Marker({ map: this.map, position: this.common.location, title: 'Esmu te!' });

    this.service.geoCode()({
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
      body.location = this.googleAutocompleteService.getPlace().geometry.location;
    } else {
      body.location = this.common.location;
    }
    if (body.radius == null) {
      body.radius = 1000;
    }
    if (body.type) {
      body.type = this.findTypeValue(body.type);
    }
    body.count = 18;

    this.loading = true;
    this.submitted = true;
    this.loadMore = false;
    this.service.placesTextSearch(this.googleMapsService, body)({
      next: this.setPlaces,
      error: () => { },
      complete: () => {
        this.loading = false;
        this.loadMore = true;
      }
    });
  }

  setPlaces = (data, pagination) => {
    if (this.loadMore) {
      this.places = this.places.concat(data);
    } else {
      this.places = data;
    }


    for (let i = 0; i < this.places.length; i++) {
      const marker = new google.maps.Marker({
        map: this.map, position: this.places[i].geometry.location,
        icon: 'https://mt.google.com/vt/icon?psize=30&color=ff304C13&name=icons' +
          '/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=%E2%80%A2'
      });
    }

    this.getNextPage = pagination.hasNextPage && (() => {
      this.loading = true;
      pagination.nextPage();
    });
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
      return place.photos[0].getUrl({ maxWidth: 140, maxHeight: 140 });
    }
  }

  findTypeValue(title: string): string {
    let value = '';
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].title === title) {
        value = this.categories[i].value;
        break;
      }
    }
    return value;
  }
}
