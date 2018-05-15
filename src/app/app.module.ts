import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { } from '@types/googlemaps';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from './../environments/environment';
import { AppService } from './services/app.service';
import { UserService } from './services/user.service';
import { Common } from './common';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { PlacesComponent } from './places/places.component';
import { PlaceComponent } from './place/place.component';
import { RegistrationComponent } from './registration/registration.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sakums', component: HomeComponent },
  { path: 'vietas', component: PlacesComponent },
  { path: 'vieta/:id', component: PlaceComponent },
  { path: 'saraksti', component: ListsComponent },
  { path: 'saraksts/:id', component: ListComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    PlacesComponent,
    PlaceComponent,
    RegistrationComponent,
    ListsComponent,
    ListComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AppService,
    UserService,
    Common
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
