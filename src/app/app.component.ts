import { Component } from '@angular/core';
import { Common } from './common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private common: Common
  ) {
    translate.setDefaultLang(common.DEFAULT_LOCALE.key);
  }
}
