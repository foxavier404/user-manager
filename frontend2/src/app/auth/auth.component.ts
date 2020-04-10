import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from "../service/utilisateur.service";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public connectutil = this.formbuilder.group(
    {
      name:[
        '',
        [
            Validators.required,
            Validators.maxLength(100)
        ]

      ],

      email:[
        '',
        [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9,_%-]+@[a-zA-Z0-9 -]$')
        ]

      ]
    }
  )
  public errormessage = {
    name: [
      {
        type: 'required', message: 'le nom est obligatoire'
      },
      {
        type: 'maxlength', message: 'le nom est superieur a 100 caractère'
      }
    ],
    email: [
      {
        type: 'required', message: 'lemails est obligatoire'
      },
      {
        type: 'pattern', message: 'le mail ne respect le format spécifié '
      }
    ]

  }

  constructor(public formbuilder: FormBuilder) { }

  get name() {
    return this.connectutil.get('name');
  }
  get email(){
    return this.connectutil.get('email');
  }
  ngOnInit(): void {
  }

}
