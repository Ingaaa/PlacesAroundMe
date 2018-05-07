import { Injectable } from '@angular/core';
import { Common } from './common';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AppService {
    geo: google.maps.Geocoder = new google.maps.Geocoder();
    items: Observable<any[]>;

    constructor(
        private common: Common,
        public angularFire: AngularFireAuth
    ) { }

    getLocation(reload: boolean): Observable<any> {

        return new Observable((observer) => {
            if (this.common.location != null && reload === false) {
                observer.next();
                observer.complete();
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.common.setLocation(position);
                        observer.next();
                        observer.complete();
                    }, () => {
                        this.common.setDefaultLocation();
                        observer.next();
                        observer.complete();
                    });
                } else {
                    this.common.setDefaultLocation();
                    observer.next();
                    observer.complete();
                }
            }
        });
    }

    searchPlaces(googleMapsService: google.maps.places.PlacesService,
        body: google.maps.places.PlaceSearchRequest): Observable<any> {

        return new Observable((observer) => {
            googleMapsService.nearbySearch(body,
                (data: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        observer.next(data);
                    } else {
                        observer.error(data);
                    }
                    observer.complete();
                });
        });
    }

    geoCode(): Observable<any> {

        return new Observable((observer) => {
            this.geo.geocode({
                location: this.common.location
            }, (data: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(data);
                } else {
                    observer.error(data);
                }
                observer.complete();
            });
        });
    }

    getPlaceDetails(placesService: google.maps.places.PlacesService, body: google.maps.places.PlaceDetailsRequest): Observable<any> {

        return new Observable((observer) => {
            placesService.getDetails(body, (data: google.maps.places.PlaceResult, status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    observer.next(data);
                } else {
                    observer.error(data);
                }
                observer.complete();
            });
        });
    }
}
