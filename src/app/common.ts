import { Injectable } from "@angular/core";


@Injectable()
export class Common {
    defaultLatitude = 56.9582922;
    defaultLongitude = 24.100993;
    latitude;
    longitude;
    location;

    categories = [
        { value: "money", title: "Nauda" },
        { value: "transportation", title: "Transports" },
        { value: "fun", title: "Izklaide" },
        { value: "nightlife", title: "Nakts izklaide" },
        { value: "beauty", title: "Skaistums" },
        { value: "food", title: "Ēdiens" },
        { value: "shopping", title: "Iepirkšanās" }
    ]
    types = [
        { value: "accounting", title: "Grāmatvedība", category: "Nauda" },
        { value: "airport", title: "Lidosta", category: "Transports" },
        { value: "amusement_park", title: "Atrakciju parks", category: "Izklaide" },
        { value: "aquarium", title: "Akvārijs", category: "Izklaide" },
        { value: "art_gallery", title: "Mākslas galerija", category: "Izklaide" },
        { value: "atm", title: "Bankomāts", category: "Nauda" },
        { value: "bakery", title: "Maiznīca", category: "Ēdiens" },
        { value: "bank", title: "Banka", category: "Nauda" },
        { value: "bar", title: "Bārs", category: "Nakts izklaide" },
        { value: "beauty_salon", title: "Skaistumkopšanas salons", category: "Skaistums" },
        { value: "bicycle_store", title: "Riteņbraukšanas veikals", category: "Transports" },
        { value: "book_store", title: "Grāmatu veikals", category: "Izklaide" }
    ]
}





/*bowling_alley
bus_station
cafe
campground
car_dealer
car_rental
car_repair
car_wash
casino
cemetery
church
city_hall
clothing_store
convenience_store
courthouse
dentist
department_store
doctor
electrician
electronics_store
embassy
fire_station
florist
funeral_home
furniture_store
gas_station
gym
hair_care
hardware_store
hindu_temple
home_goods_store
hospital
insurance_agency
jewelry_store
laundry
lawyer
library
liquor_store
local_government_office
locksmith
lodging
meal_delivery
meal_takeaway
mosque
movie_rental
movie_theater
moving_company
museum
night_club
painter
park
parking
pet_store
pharmacy
physiotherapist
plumber
police
post_office
real_estate_agency
restaurant
roofing_contractor
rv_park
school
shoe_store
shopping_mall
spa
stadium
storage
store
subway_station
supermarket
synagogue
taxi_stand
train_station
transit_station
travel_agency
veterinary_care
zoo*/

