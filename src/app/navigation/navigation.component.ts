import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild(RegistrationComponent) registration: RegistrationComponent;
  logedIn: boolean = false;
  isCollapsed: boolean = true;
  user;
  showShare: boolean = navigator['share'] != null ? true : false;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.authState();
  }

  authState() {
    this.service.authState().subscribe({
      next: (user) => {
        if (user != null && user.uid != null) {
          this.logedIn = true;
          this.user = (user);
        } else {
          this.logedIn = false;
        }
      }, error: (data) => { }
    });
  }

  openRegistartion() {
    this.registration.open();
  }

  logOut() {
    this.registration.logOut();
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  share() {
    if (navigator['share']) {
      navigator['share']({
        title: 'Vietas man apkārt',
        text: 'Apskaties šo vietni - tā ir labākā!',
        url: 'https://placesaroundme-9b752.firebaseapp.com',
      })
        .then(() => { })
        .catch((error) => { });
    }
  }

}


