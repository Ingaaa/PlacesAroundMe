import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  private userUID: string;
  private lists;

  constructor(
    private afs: AngularFirestore,
    private service: UserService
  ) { }

  ngOnInit() {
    this.service.authState().subscribe({
      next: (user) => {
        if (user != null && user.uid != null) {
          this.userUID = user.uid;
          this.getUserLists(user.uid);
          console.log(user);
        } else {
          this.lists = [];
        }
      }, error: (data) => {
        console.log(data);
        this.lists = [];
      }
    });
  }

  getUserLists(userUID) {
    this.service.getUserLists(userUID).subscribe({
      next: (data) => {
        this.lists = data['lists'];
        console.log(data);
      }
    });
  }

}
