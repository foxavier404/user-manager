import { Component, OnInit, Input } from '@angular/core';
import { UserRule } from "../service/UserRule";

import { LocalStorageService } from '../service/localStorageservice';
import { Annonce } from '../service/annonce';

import { UtilisateurViewComponent } from '../utilisateur-view/utilisateur-view.component';
import { UserFormValidatorService } from '../service/Validation';
//import { NgxSpinnerService } from 'ngx-spinner';
//import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
        @Input() utilisateurName = 'string';
        @Input() utilisateurStatus ='string';

  constructor() { }

  ngOnInit(): void {
  }
   
  getStatus() {
    return this.utilisateurStatus;
  }
  getColor() {
    if(this.utilisateurStatus ==='connecté'){
      return 'blue';
    }else if(this.utilisateurStatus ==='non connecté'){
      return 'white';
    }

  }

}
