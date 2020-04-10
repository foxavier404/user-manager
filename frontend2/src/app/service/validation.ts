import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class UserFormValidatorService {

  public constructor(public formBuilder: FormBuilder,) {

  }

  public errorMessages = {
    name: [
      { type: 'required', message:'le nom est obligatoire' },
      { type: 'maxlength', message:'le nom ne dois pas exéder 20 caractères' },
    ],
    surname: [
      { type: 'required', message:'le prenom est obligatoire' },
      { type: 'maxlength', message:'le prenom ne dois pas exéder 20 caractères' },
    ],
    photoUrl: [
      { type: 'required', message:'la photo de profile est obligatoire' },
    ],
    email: [
      { type: 'required', message:'l\'adresse mail est obligatoire' },
      { type: 'pattern', message:'entrez une adresse mail valide' },
    ],
    poste: [
      { type: 'required', message:'le poste de l\'utilisateur est obligatoire' },
    ],
    password: [
      { type: 'required', message:'le mot de passe est obligatoire' },
      { type: 'minlength', message:'le mot de passe doit avoir minimum 6 caractères' },
    ],
  }

  public addUserForm = this.formBuilder.group({
    name: ['', 
      [
        Validators.required,
        Validators.maxLength(20)
      ]
    ],
    surname: ['',
      [
        Validators.required,
        Validators.maxLength(20)
      ]
    ],
    email: ['',
        [
            Validators.required,
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ]
    ],
    poste: ['',
        [
            Validators.required,
        ]
    ],
    photoUrl: ['',
        [
            Validators.required,
        ]
    ],
    password: ['',
        [
            Validators.required,
            Validators.minLength(6)
        ]
    ],
  });

  public connectUserForm = this.formBuilder.group({
    email: ['',
      [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]
    ],
    password: ['',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
  });
    
}