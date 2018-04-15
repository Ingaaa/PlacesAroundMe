import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';

@Injectable()
export class Common {
    readonly defaultLatitude: number = 56.9582922;
    readonly defaultLongitude: number = 24.100993;
    latitude: number;
    longitude: number;
    location: google.maps.LatLng;

    readonly openOptions = [
        { value: true, title: 'Jā' },
        { value: false, title: 'Nē' }
    ];

    readonly categories = [
        {
            value: 'money', title: 'Nauda',
            types: ['insurance_agency', 'atm', 'bank']
        },
        {
            value: 'transportation', title: 'Transports',
            types: ['bus_station', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'subway_station',
                'gas_station', 'parking', 'taxi_stand', 'train_station', 'transit_station', 'airport', 'bicycle_store']
        },
        {
            value: 'fun', title: 'Izklaide',
            types: ['bowling_alley', 'movie_theater', 'museum', 'park', 'amusement_park', 'aquarium', 'art_gallery',
                'stadium', 'zoo']
        },
        {
            value: 'sport', title: 'Sports',
            types: ['stadium', 'gym']
        },
        {
            value: 'nightlife', title: 'Nakts izklaide',
            types: ['casino', 'night_club', 'bar', 'liquor_store']
        },
        {
            value: 'beauty', title: 'Skaistums',
            types: ['hair_care', 'spa', 'beauty_salon']
        },
        {
            value: 'food', title: 'Ēdiens',
            types: ['cafe', 'restaurant', 'meal_delivery', 'meal_takeaway', 'bakery']
        },
        {
            value: 'shopping', title: 'Iepirkšanās',
            types: ['store', 'convenience_store', 'department_store', 'electronics_store',
                'furniture_store', 'shoe_store', 'shopping_mall', 'home_goods_store', 'jewelry_store', 'pet_store',
                'liquor_store', 'bicycle_store', 'book_store', 'supermarket', 'hardware_store', 'movie_rental']
        },
        {
            value: 'education', title: 'Izglītība',
            types: ['library', 'school', 'book_store']
        },
        {
            value: 'animals', title: 'Dzīvnieki',
            types: ['pet_store', 'veterinary_care', 'zoo']
        },
        {
            value: 'accommodation', title: 'Mājvieta',
            types: ['campground', 'lodging']
        },
        {
            value: 'health', title: 'Veselība',
            types: ['dentist', 'doctor', 'hospital', 'pharmacy', 'physiotherapist']
        },
        {
            value: 'house', title: 'Māja',
            types: ['electronics_store', 'furniture_store', 'home_goods_store', 'hardware_store', 'plumber',
                'moving_company', 'electrician']
        }
    ];

    readonly authErrors = {
        'auth/email-already-in-use': 'E-pasts ... jau ir reģistrēts',
        'auth/invalid-email': '',
        'auth/weak-password': '',
        'auth/user-not-found': 'Lietotājs ar e-pasta adresi ... nav atrasts'
    };

    setLocation(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.location = new google.maps.LatLng(this.latitude, this.longitude);
    }

    setDefaultLocation() {
        this.location = new google.maps.LatLng(this.defaultLatitude, this.defaultLongitude);
    }
}





/*
cemetery
church
city_hall
courthouse
embassy
fire_station
florist
funeral_home
hindu_temple
*insurance_agency
laundry
lawyer
local_government_office
locksmith
mosque
painter
police
post_office
real_estate_agency
roofing_contractor
rv_park
storage
synagogue
travel_agency
*/

