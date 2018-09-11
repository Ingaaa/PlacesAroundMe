import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthService } from '../services/auth.service';
import { Common } from '../common';
import { TranslateService } from '@ngx-translate/core';

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
  locales;
  selectedLocale;

  constructor(
    private authService: AuthService,
    private common: Common,
    private translate: TranslateService,
  ) {
    this.locales = common.LOCALES;
  }

  ngOnInit() {
    if (this.translate.currentLang) {
      this.selectedLocale = this.translate.currentLang;
    } else {
      this.selectedLocale = this.translate.defaultLang;
    }

    this.translate.onLangChange.subscribe({
      next: (data) => {
        this.selectedLocale = data.lang;
      },
      error: () => { },
      complete: () => { }
    });
    this.authState();
  }

  authState() {
    this.authService.user.subscribe({
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

  changeLocale(locale) {
    this.translate.use(locale.key);
  }

}


