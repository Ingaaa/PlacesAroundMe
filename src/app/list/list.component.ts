import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { AppService } from '../services/app.service';
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
  loading: boolean = false;
  submitted: boolean = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private service: AppService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.authService.user.subscribe({
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
    this.loading = true;
    this.userService.getListPlaces(this.userUID, this.id).subscribe({
      next: (data) => {
        const places = [];
        this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
        data.forEach((element) => {
          this.service.getPlaceDetails(this.placesService, { placeId: element['id'] })
            ({
              next: (place) => places.push(place),
              error: () => { },
              complete: () => { }
            });
        });
        this.places = places;
      },
      error: () => { },
      complete: () => {
        console.log(this);
        this.loading = false;
      }
    });
  }

  getPhoto(place) {
    if ((place.photos != null) && place.photos.length > 0) {
      return place.photos[0].getUrl({ maxWidth: 140, maxHeight: 140 });
    }
  }

}
