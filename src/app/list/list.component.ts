import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private placesService: google.maps.places.PlacesService;
  private userUID: string;
  places = [];
  private id: string;

  constructor(
    private userService: UserService,
    private service: AppService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.userService.authState().subscribe({
      next: (user) => {
        if (user != null && user.uid != null) {
          this.userUID = user.uid;
          this.getListPlaces();
        } else {
          this.places = [];
        }
      }, error: (data) => {
        this.places = [];
      }
    });
  }

  getListPlaces() {
    this.userService.getListPlaces(this.userUID, this.id).subscribe({
      next: (data) => {
        const places = [];
        this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
        data.forEach((element) => {
          this.service.getPlaceDetails(this.placesService, { placeId: element['id'] })
            .subscribe({
              next: (place) => places.push(place),
              error: () => { },
              complete: () => { }
            });
        });
        console.log(data);
        this.places = places;
      }
    });
  }

  getPhoto(place) {
    if ((place.photos != null) && place.photos.length > 0) {
      return place.photos[0].getUrl({ maxWidth: 140 });
    }
  }

}
