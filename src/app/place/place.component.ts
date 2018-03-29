import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  id;
  request = {
  placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
};
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {

    service = new google.maps.places.PlacesService(map);
    service.getDetails(this.request, callback);
  }

}
