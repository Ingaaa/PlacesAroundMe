import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-place-photo',
  templateUrl: './place-photo.component.html',
  styleUrls: ['./place-photo.component.css']
})
export class PlacePhotoComponent implements OnInit {
  @Input() place;
  photos;
  photo;

  constructor() { }

  ngOnInit() {
    this.photos = this.place.photos;
    this.getPhoto();
  }

  getPhoto() {
    if (this.place.photo) {
      this.photo = this.place.photo;
    } else if ((this.photos != null) && this.photos.length > 0) {
      this.photo = this.photos[0].getUrl({ maxHeight: 180 });
    }
  }

}
