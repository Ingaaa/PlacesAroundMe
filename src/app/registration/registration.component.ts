import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('registrationModal') registrationModal;
  form = <any>{};
  closeResult: string;

  ngOnInit() {
  }

  constructor(private modalService: NgbModal,
    public angularFire: AngularFireAuth) { }

  register() {
    this.angularFire.auth.createUserWithEmailAndPassword(this.form.email, this.form.password).then(function (data) {
      console.log(data);
    }, function (data) {
      console.log(data);
    });
  }

  open() {
    this.modalService.open(this.registrationModal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
