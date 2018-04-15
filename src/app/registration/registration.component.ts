import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { Common } from '../common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('registrationModal') registrationModal;
  @Input('authState') authState;
  modalRef;
  form = <any>{};
  closeResult: string;

  ngOnInit() {
  }

  constructor(
    private modalService: NgbModal,
    private service: AppService,
    private common: Common
  ) { }

  register() {
    this.service.register(this.form.email, this.form.password).then((data) => {
      console.log(data);
      this.modalRef.close();
      this.authState();
    }, (error) => {
      console.log(error);
      const errorText = this.common.authErrors[error.code];
    });
  }

  login() {
    this.service.signIn(this.form.email, this.form.password).then((data) => {
      console.log(data);
      this.modalRef.close();
      this.authState();
    }, (error) => {
      console.log(error);
      const errorText = this.common.authErrors[error.code];
    });
  }

  logOut() {
    this.service.signOut().then((data) => {
      console.log(data);
      this.authState();
    }, (error) => {
      console.log(error);
      const errorText = this.common.authErrors[error.code];
    });
  }

  open() {
    this.modalRef = this.modalService.open(this.registrationModal);
  }
}
