import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from './common';
import {} from '@types/googlemaps';

@Injectable()
export class AppService {
    //Riga = new google.maps.LatLng(56.9582922, 24.100993);
    //googleMapsService;
    homePlacesUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=56.9582922,24.100993&radius=500&key=AIzaSyCVxcCvpaU4bDihear66zodfBfHh9bGAbw&limit=10&type=point_of_interest&language=lat";
    constructor(private http: HttpClient,
        private common: Common) { }
    getHomePlaces() {
        return this.http.get(this.homePlacesUrl);
    }

    getLocation(callback) {
        if (navigator.geolocation) {
            console.log('Geolocation is supported!');
            navigator.geolocation.getCurrentPosition(function (position) {
                this.common.latitude = position.coords.latitude;
                this.common.longitude = position.coords.longitude;
                this.common.location = new google.maps.LatLng(this.common.latitude, this.common.longitude);
                callback();
            }.bind(this), function () {
                this.common.location = new google.maps.LatLng(this.common.defaultLatitude, this.common.defaultLongitude);
                callback();
            }.bind(this));
        }
        else {
            console.log('Geolocation is not supported for this Browser/OS.');
            this.common.location = new google.maps.LatLng(this.common.defaultLatitude, this.common.defaultLongitude);
            callback();
        }
    }
}