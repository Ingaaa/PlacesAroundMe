import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  private userUID: string;
  lists;

  constructor(
    private service: UserService
  ) { }

  ngOnInit() {
    this.service.authState().subscribe({
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
    this.service.getUserLists(userUID).subscribe({
      next: (data) => {
        console.log(data);
        this.lists = data;
      }
    });
  }

}
