import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCollapseModule, NgbTooltipModule, NgbCarouselModule,
  NgbModalModule, NgbTabsetModule, NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { } from '@types/googlemaps';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { PlaceListComponent } from './place-list/place-list.component';
import { LoaderComponent } from './loader/loader.component';
import { PlacePhotoComponent } from './place-photo/place-photo.component';
import { FooterComponent } from './footer/footer.component';

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
    NotfoundComponent,
    PlaceListComponent,
    LoaderComponent,
    PlacePhotoComponent,
    FooterComponent
  ],
  imports: [
    LazyLoadImageModule,
    BrowserModule,
    FormsModule,
    NgbCollapseModule.forRoot(),
    NgbTooltipModule.forRoot(),
    NgbCarouselModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbTabsetModule.forRoot(),
    NgbDropdownModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppService,
    UserService,
    Common
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
