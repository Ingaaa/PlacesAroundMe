import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { Common } from '../common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('registrationModal') registrationModal;
  modalRef;
  rForm = <any>{};
  sForm = <any>{};
  sError: string;
  rError: string;

  ngOnInit() {
  }

  constructor(
    private modalService: NgbModal,
    private service: UserService,
    private common: Common
  ) { }

  register() {
    this.clearErrors();
    if (this.rForm.password === this.rForm.password2) {
      this.service.register(this.rForm.email, this.rForm.password).then((data) => {
        this.modalRef.close();
        this.service.createUserLists(data.uid);
      }, (error) => {
        this.rError = this.common.getErrorText(error.code);
      });
    } else {
      this.rError = this.common.getErrorText('passwords_doesnt_match');
    }
  }

  login() {
    this.clearErrors();
    this.service.signIn(this.sForm.email, this.sForm.password).then((data) => {
      this.modalRef.close();
    }, (error) => {
      this.sError = this.common.getErrorText(error.code);
    });
  }

  logOut() {
    this.service.signOut().then((data) => {
    }, (error) => { });
  }

  clearErrors() {
    this.rError = '';
    this.sError = '';
  }

  open() {
    this.modalRef = this.modalService.open(this.registrationModal);
  }
}
