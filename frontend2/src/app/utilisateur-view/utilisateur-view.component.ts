import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from "../service/utilisateur.service";
import { UserRule } from "../service/UserRule";
import { Annonce } from '../service/annonce';
//import { AlertService } from 'ngx-alerts';
import { LocalStorageService } from '../service/localStorageService';
import { from } from 'rxjs';
import { ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-utilisateur-view',
  templateUrl: './utilisateur-view.component.html',
  styleUrls: ['./utilisateur-view.component.css']
})
export class UtilisateurViewComponent implements OnInit {

  isAuth = false;

  lastUpdate = new Date();

utilisateurs: any[];
  utilisateurService: any;
  public user: UserRule;
  public allUsers: any[] = [];
  public adminList: any[] = [];
  public memberList: any[] = [];
  private _localStorageService: LocalStorageService;
  spinner: any;
  public get localStorageService(): LocalStorageService {
    return this._localStorageService;
  }
  public set localStorageService(value: LocalStorageService) {
    this._localStorageService = value;
  }
  


  construtor( utilisateurService : UtilisateurService,
     localStorageService:LocalStorageService,
     //alertService: AlertService,
     messageService: Annonce,) {
    
     
    setTimeout(
     () => {
       this.isAuth = true;
     }, 4000 
    )
  }
  public allUser: any[] = [];
  public editedUser: UserRule;
  public users: any = {
    id: '',
    name: '',
    surname: '',
    photoUrl: '',
    poste: '',
    email: '',
    password: '',
  };
  public validForm: boolean = false;
  public errorMessages: any = this.userFormValidatorService.errorMessages;
  public addUserForm: any =  this.userFormValidatorService.addUserForm;

  constructor(
    private userFormValidatorService: ValidationErrors,
    private personnelService: UtilisateurViewComponent,
    //private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private messageService: Annonce,
  ) {
    this.localStorageService.suscribe(this);
   }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public updateAll(type: string) {
    if(type === 'NEW_MESSAGE') {
      return this.displayMessage();
    }
  }

  public async displayMessage() {
    const incomingMessage = this.messageService.incomingMessage;
    if(incomingMessage.type === 'error' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'createUser') {
      this.alertService.warning('Echec de l\'enregistrement, veuillez vérifiez voter connexion internet puis réessayer!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'error' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'updateUser') {
      this.alertService.warning('Echec de la mise à jour, veuillez vérifiez voter connexion internet puis réessayer!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'error' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'deleteUser') {
      this.alertService.warning('Echec de la suppréssion, veuillez vérifiez voter connexion internet puis réessayer!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }

    if(incomingMessage.type === 'success' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'createUser') {
      this.alertService.success('Utilisateur crée avec success !!!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'success' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'updateUser') {
      this.alertService.success('Mise à jour de l\'utilisateur réussie !!!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'success' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'deleteUser') {
      this.alertService.success('Utilisateur supprimé avec success !!!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
  }

  get name() {
    return this.addUserForm.get('name');
  };
  get surname() {
    return this.addUserForm.get('surname');
  };
  get photoUrl() {
    return this.addUserForm.get('photoUrl');
  }
  get poste() {
    return this.addUserForm.get('poste');
  }
  get email() {
    return this.addUserForm.get('email');
  }
  get password() {
    return this.addUserForm.get('password');
  }

  public getAllUser() {
    let allUsers = this.localStorageService.getAllUsersOnLocalStorage();
    if(allUsers)
      this.allUsers = allUsers;
  }

  public async addUser() {
    this.editedUser = undefined;
    this.user.name = this.user.name.trim();
    this.user.surname = this.user.surname.trim();
    this.user.email = this.user.email.trim();

    if(!this.user.name || !this.user.surname || !this.user.email || !this.user.photoUrl || !this.user.password)
      return;
    
    this.spinner.show('chargement2');
    await this.personnelService.createUser(this.user).subscribe( async (user: UserRule) => {
      if(user) {
        await this.localStorageService.storeOneUserOnLocalStorage(user);
        this.allUsers = await this.localStorageService.getAllUsersOnLocalStorage();
        this.messageService.add({type: 'success', service: 'PersonnelService', operation: 'createUser', message: ''});
        this.reset();
      }
      this.spinner.hide('chargement2');
    });
  }
  createUser(user: any) {
    throw new Error("Method not implemented.");
  }

  public reset(): void {
    this. user = {
      i: '',
      get id() {
        return this._id;
      },
      set id(value) {
        this._id = value;
      },
      name: '',
      surname: '',
      email: '',
      photoUrl: '',
      poste: '',
      password: '',
    };
  }

  public editUserCurrentInformation(user: UserRule): void {
    this.editedUser = user;
  }

  public async getPersonnelById(id: number) {
    return this.allUsers.find(person => person.id === id);
  }

  notifyPosteChange(poste: string) {
    this.user.poste = poste;
    this.editedUser.poste = poste;
  }

  public async updateUser() {
    this.spinner.show('chargement3');
    await this.personnelService.updateUser(this.editedUser).subscribe(async user => {
      if(user) {
        const index = user
                  ? this.allUsers.findIndex(member => member.id === user.id)
                  : -1;
        if(index > -1) {
          this.allUsers[index] = user;
          await this.localStorageService.storeAllUsersOnLocalStorage(this.allUsers);
          this.messageService.add({type: 'success', service: 'PersonnelService', operation: 'updateUser', message: ''});
        }
      }
      this.spinner.hide('chargement3');
    });
  }

  public async deleteUser(user: UserRule) {
    this.spinner.show('chargement4');
    await this.personnelService.deleteUser(user.i).subscribe(async () => {
      this.allUsers = this.allUsers.length === 1
                    ? []
                    : this.allUsers.filter(member => member !== user);
      await this.localStorageService.storeAllUsersOnLocalStorage(this.allUsers);
      this.messageService.add({type: 'success', service: 'PersonnelService', operation: 'deleteUser', message: ''});
      this.spinner.hide('chargement4');
    });
  }



  // ngOnInit(){
    // this.utilisateurs = this.utilisateurService.utilisateurs;
     //this.getAllUsers();
     
   //}

  //onAllumer() {
   //console.log('on allume tout !');
  //}


  public async getAllUsers() {
    this.allUsers = await this.localStorageService.getAllUsersOnLocalStorage();
    this.user = await this.localStorageService.getCurrentUserOnLocalStorage()
    this.adminList = this.allUsers.filter(user => user.poste === 'administrateur');
    this.memberList = this.allUsers.filter(user => user.poste === 'employe');
  }

  public checkUserState(id: number) {
    return this.user.poste === 'administrateur'
            ? false
            : (this.user.i !== id);
  }

}
