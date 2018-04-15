import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from '../registration/registration.component';
import { AppService } from '../app.service';

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

  constructor(private service: AppService) { }

  ngOnInit() {
    this.authState();
  }

  authState() {
    this.service.authState().subscribe({
      next: (user) => {
        if (user != null && user.uid != null) {
          this.logedIn = true;
          this.user = (user);
          console.log(user);
        }
      }
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

}


