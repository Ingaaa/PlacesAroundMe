import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../common';
import { AppService } from '../app.service';
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
  private loaded: boolean = false;
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
          this.getUserLists(user.uid);
          console.log(user);
        } else {
          this.lists = [];
        }
      }, error: (data) => {
        console.log(data);
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
    console.log(data);

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
      console.log(this.ratings);
    }
    const marker = new google.maps.Marker({
      map: this.map, position: this.place.geometry.location,
      icon: 'https://mt.google.com/vt/icon?psize=30&color=ff304C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=48&text=%E2%80%A2'
    });
    this.loaded = true;
  }

  getUserLists(userUID) {
    this.userService.getUserLists(userUID).subscribe({
      next: (data) => {
        console.log(data);
        this.lists = data['lists'];
      }
    });
  }

  addToList(listKey) {
    this.userService.updateUserList(this.id, this.userUID);
  }
}
