import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent }  from '../registration/registration.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild(RegistrationComponent) registration: RegistrationComponent;
  logedIn: boolean = false;
  closeResult: string;

  constructor() { }

  ngOnInit() { }

  openRegistartion() {
    this.registration.open();
  }

}


