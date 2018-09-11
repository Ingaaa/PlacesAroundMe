import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  private userUID: string;
  lists;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user.subscribe({
      next: (user) => {
        if (user != null && user.uid != null) {
          this.userUID = user.uid;
          this.getUserLists(user.uid);
        } else {
          this.lists = [];
        }
      }, error: (data) => {
        this.lists = [];
      }
    });
  }

  getUserLists(userUID) {
    this.userService.getUserLists(userUID).subscribe({
      next: (data) => {
        this.lists = data;
      }
    });
  }

}
