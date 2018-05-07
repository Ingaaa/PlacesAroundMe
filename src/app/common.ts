import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';

@Injectable()
export class Common {
    readonly defaultLatitude: number = 56.9582922;
    readonly defaultLongitude: number = 24.100993;
    readonly defaultLocation: google.maps.LatLng =
        new google.maps.LatLng(this.defaultLatitude, this.defaultLongitude);
    latitude: number;
    longitude: number;
    location: google.maps.LatLng;
    geolocationPermissions: boolean = false;

    readonly openOptions = [
        { value: true, title: 'Jā' },
        { value: false, title: 'Nē' }
    ];

    readonly categories = [
        { value: 'accounting', title: 'Grāmatvedība' },
        { value: 'airport', title: 'Lidosta' },
        { value: 'amusement_park', title: 'Atrakciju parks' },
        { value: 'aquarium', title: 'Akvārijs' },
        { value: 'art_gallery', title: 'Mākslas galerija' },
        { value: 'atm', title: 'Bankomāts' },
        { value: 'bakery', title: 'Maiznīca' },
        { value: 'bank', title: 'Banka' },
        { value: 'bar', title: 'Bārs' },
        { value: 'beauty_salon', title: 'Skaistumkopšanas salons' },
        { value: 'bicycle_store', title: 'Riteņbraukšanas veikals' },
        { value: 'book_store', title: 'Grāmatu veikals' },
        { value: 'bowling_alley', title: 'Boulings' },
        { value: 'bus_station', title: 'Autobusa pietura' },
        { value: 'cafe', title: 'Kafejnīca' },
        { value: 'campground', title: 'Kempings' },
        { value: 'car_dealer', title: 'Automašīnu tirgotājs' },
        { value: 'car_rental', title: 'Autonoma' },
        { value: 'car_repair', title: 'Automašīnu remonts' },
        { value: 'car_wash', title: 'Automazgātuve' },
        { value: 'casino', title: 'Kazino' },
        { value: 'cemetery', title: 'Kapsēta' },
        { value: 'church', title: 'Baznīca' }
    ];

    readonly authErrors = {
        'auth/email-already-in-use': 'E-pasts jau ir reģistrēts.',
        'auth/invalid-email': 'E-pastam ir nederīgs formāts',
        'auth/weak-password': 'Parolei ir jāsatur vismaz 6 simbli ',
        'auth/user-not-found': 'Lietotājs ar e-pasta adresi nav atrasts.',
        'passwords_doesnt_match': 'Paroles nesakrīt.',
        'auth/wrong-password': 'E-pasts vai parole ir nepareiza.',
        'default_error_text': 'Radās nezināma kļūda.'
    };

    getErrorText(key): string {
        if (this.authErrors[key] != null) {
            return this.authErrors[key];
        } else {
            return this.authErrors['default_error_text'];
        }
    }

    setLocation(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.location = new google.maps.LatLng(this.latitude, this.longitude);
    }

    setDefaultLocation() {
        this.location = this.defaultLocation;
    }
}

