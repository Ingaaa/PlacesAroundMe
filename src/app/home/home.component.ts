import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Common } from '../common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  placesService: google.maps.places.PlacesService;
  places: google.maps.places.PlaceResult[];
  loaded: boolean = false;
  search: { query } = { query: '' };

  constructor(
    private service: AppService,
    private common: Common,
    private router: Router
  ) { }

  ngOnInit() {
    this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    this.loadPlaces();
  }

  getPhoto(place) {
    if ((place.photos != null) && place.photos.length > 0) {
      return place.photos[0].getUrl({ maxWidth: 140, maxHeight: 140 });
    }
  }

  searchPlaces() {
    if (this.search.query != null && this.search.query !== '') {
      this.router.navigate(['/vietas', { query: this.search.query }]);
    }
  }

  loadPlaces = () => {
    this.service.searchPlaces(this.placesService, {
      location: this.common.defaultLocation,
      radius: 500,
      type: 'cafe'
    }).subscribe({
      next: (data) => {
        this.places = data;
        this.loaded = true;
      },
      error: () => { },
      complete: () => { }
    });
  }
}
