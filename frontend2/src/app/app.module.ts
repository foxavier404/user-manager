import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { UtilisateurService } from "./service/utilisateur.service";
import { Routes, RouterModule } from '@angular/router';
import { UtilisateurViewComponent } from './utilisateur-view/utilisateur-view.component';
import { AuthComponent } from './auth/auth.component';
//import { MDBBootstrapModule } from '../angular-bootstrap-md';



import { HttpClientModule } from '@angular/common/http';

import { httpError } from './service/httpError';
import { Annonce } from './service/annonce';
import { AuthService } from './service/auth';
//import { PersonnelService } from './service/personnel.service';

import { LocalStorageService  } from './service/localStorageservice';

//import { NgxSpinnerModule } from 'ngx-spinner';
//import { AlertModule } from 'ngx-alerts';





















const appRoutes: Routes = [
    { path: 'utilisateurs' , component: UtilisateurViewComponent },
    { path: 'auth', component: AuthComponent },
    { path: '', component: AuthComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    UtilisateurComponent,
    AuthComponent,
    UtilisateurViewComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    UtilisateurService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
