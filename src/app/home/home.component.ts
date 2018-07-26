import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  places;
  subscription;
  loading: boolean = true;
  submitted: boolean = true;
  search: { query } = { query: '' };

  constructor(
    private service: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPlaces();
  }

  searchPlaces() {
    if (this.search.query) {
      this.router.navigate(['/vietas', { query: this.search.query }]);
    }
  }

  loadPlaces = () => {
    this.subscription = this.service.getHomeList().subscribe({
      next: (data) => {
        this.places = data;
        this.loading = false;
        this.subscription.unsubscribe();
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
