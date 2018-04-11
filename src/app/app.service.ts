import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from './common';
import { } from '@types/googlemaps';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {
    geo = new google.maps.Geocoder();

    constructor(private http: HttpClient,
        private common: Common) { }

    getLocation(reload: boolean): Observable<any> {
        return new Observable((observer) => {
            if (this.common.location != undefined && reload === false) {
                observer.next();
                observer.complete();
            } else {
                if (navigator.geolocation) {
                    console.log('Geolocation is supported!');
                    navigator.geolocation.getCurrentPosition(function (position) {
                        this.common.setLocation(position);
                        console.log(position);
                        observer.next();
                        observer.complete();
                    }.bind(this), function () {
                        this.common.setDefaultLocation();
                        observer.next();
                        observer.complete();
                    }.bind(this));
                }
                else {
                    console.log('Geolocation is not supported for this Browser/OS.');
                    this.common.setDefaultLocation();
                    observer.next();
                    observer.complete();
                }
            }
        })
    };

    searchPlaces(googleMapsService, body) {
        return new Observable((observer) => {
            googleMapsService.nearbySearch(body, function (data) {
                observer.next(data);
                observer.complete();
            }.bind(this));
        })
    };

    geoCode() {
        return new Observable((observer) => {
            this.geo.geocode({
                location: this.common.location
            }, function (data) {
                observer.next(data);
                observer.complete();
            }.bind(this));
        })
    }

    getPlaceDetails(placesService: google.maps.places.PlacesService, body) {
        return new Observable((observer) => {
            placesService.getDetails(body, function (data) {
                observer.next(data);
                observer.complete();
            }.bind(this));
        })
    }
}