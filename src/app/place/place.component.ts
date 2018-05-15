import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../common';
import { AppService } from '../services/app.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  private placesService: google.maps.places.PlacesService;
  private place: google.maps.places.PlaceResult;
  private map: google.maps.Map;
  private id: string;
  private ratings: string[] = [];
  loaded: boolean = false;
  private userUID: string;
  private lists;

  constructor(
    private route: ActivatedRoute,
    private common: Common,
    private service: AppService,
    private userService: UserService
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.service.getLocation(false).subscribe({
      next: this.setLocation
    });

    this.userService.authState().subscribe({
      next: (user) => {
        if (user != null && user.uid != null) {
          this.userUID = user.uid;
          this.getUserLists();
        } else {
          this.lists = [];
        }
      }, error: (data) => {
        this.lists = [];
      }
    });
  }

  setLocation = () => {
    this.map = new google.maps.Map(document.getElementById('placeMap'), {
      center: this.common.location,
      zoom: 15
    });

    const marker = new google.maps.Marker({ map: this.map, position: this.common.location, title: 'Esmu te!' });
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.service.getPlaceDetails(this.placesService, { placeId: this.id })
      .subscribe({
        next: this.setPlace,
        error: () => { },
        complete: () => { }
      });
  }

  setPlace = (data) => {

    this.place = data;
    for (let i: number = 1; i < 6; i++) {
      if (this.place.rating >= i) {
        this.ratings.push('checked');
      } else if (this.place.rating < i) {
        this.ratings.push('empty');
      } else {
        this.ratings.push('half-checked');
        this.ratings.push('half-empty');
      }
    }

    const marker = new google.maps.Marker({
      map: this.map,
      position: this.place.geometry.location,
      title: this.place.name,
      icon: 'https://mt.google.com/vt/icon?psize=30&color=ff304C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=%E2%80%A2'
    });
    this.loaded = true;
  }

  getUserLists() {
    this.userService.getUserLists(this.userUID).subscribe({
      next: (data) => {
        this.lists = data;
        this.lists.forEach(element => {
          this.findPlaceInList(element);
        });
      }
    });
  }

  findPlaceInList(list) {
    this.userService.findPlaceInList(this.id, this.userUID, list.id).subscribe({
      next: (data) => {
        if (data && data.length && data.length > 0) {
          list.added = true;
        } else {
          list.added = false;
        }
      }
    });
  }

  addToList(list) {
    if (list.added) {
      this.userService.removeFromUserList(this.id, this.userUID, list.id);
    } else {
      this.userService.addToUserList(this.id, this.userUID, list.id);
    }
  }
}
