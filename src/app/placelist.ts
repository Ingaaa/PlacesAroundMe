export class PlaceList {
    id: string;
    userUID: string;
    created: Date;
    title: string;
    placesIds: Array<PlaceListElement>;
}

export class PlaceListElement {
    placeId: string;
    added: Date;
}
