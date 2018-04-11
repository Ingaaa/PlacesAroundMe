import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { PlacesComponent } from './places/places.component';
import { Common } from './common';
import {} from '@types/googlemaps';
import { ViewChild } from '@angular/core';
import { PlaceComponent } from './place/place.component';
import { Observable} from 'rxjs/Observable';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { RegistrationComponent } from './registration/registration.component';

const appRoutes: Routes = [
  { path: 'sakums', component: HomeComponent },
  { path: 'vietas', component: PlacesComponent },
  { path: 'vieta/:id', component: PlaceComponent },
  {
    path: '',
    redirectTo: 'sakums',
    pathMatch: 'full'
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    NavigationComponent,
    HomeComponent,
    PlacesComponent,
    PlaceComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  providers: [
    AppService,
    Common
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
