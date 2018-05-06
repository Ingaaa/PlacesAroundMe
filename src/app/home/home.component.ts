import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
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

  constructor(
    private service: AppService,
    private common: Common
  ) { }

  ngOnInit() {
    this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    this.service.getLocation(false).subscribe({
      next: this.searchPlaces,
      error: () => { },
      complete: () => { }
    });
  }

  getPhoto(place) {
    if ((place.photos != null) && place.photos.length > 0) {
      return place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 });
    }
  }

  searchPlaces = () => {
    this.service.searchPlaces(this.placesService, {
      location: this.common.location,
      radius: 500,
      type: 'point_of_interest'
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
