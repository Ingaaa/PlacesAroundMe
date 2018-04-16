import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists = [
    { key: 'favourites', value: 'Favorīti' },
    { key: 'toVisit', value: 'Vēlos apmeklēt' },
    { key: 'visited', value: 'Esmu apmeklējis' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
