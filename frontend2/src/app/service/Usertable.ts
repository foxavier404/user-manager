import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserRule } from "../service/UserRule";
import { httpError, HandleError } from './httpError';

import { LocalStorageService } from './localStorageservice';

import { Annonce } from './annonce';

//import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class PersonnelService {

    private handleError: HandleError;
    
    public constructor(
        private localStorageService: LocalStorageService,
        private messageService: Annonce,
        private http: HttpClient,
        private httpErrorHandler: httpError,
       // private spinner: NgxSpinnerService,
    ) {
        this.handleError = httpErrorHandler.createHandleError('PersonnelService');
        this.initAllVariables();
    }

    public initAllVariables() {
        this.getAllUsersInLocal();
    }

    public async getAllUsersInLocal() {
        //this.spinner.show('chargement1');
        await this.getAllUsers().subscribe(async users => {
            if(users && users.length != 0) {
                await this.localStorageService.storeAllUsersOnLocalStorage(users);
                this.messageService.add({type: 'success', service: 'PersonnelService', operation: 'getAllUsers', message: 'Les données ont bien été mis à jour !!'});
            }
          //  this.spinner.hide('chargement1');
        });
    }
    
    public getAllUsers(): Observable <UserRule[]> {
        return this.http
        .get<UserRule[]>('http://localhost:8000/api/users')
        .pipe(catchError(this.handleError('getAllUsers', [])));
    }

    public createUser(user: UserRule): Observable <UserRule> {
        return this.http
        .post<UserRule>('http://localhost:8000/api/user', user)
        .pipe(catchError(this.handleError('createUser', user)));
    }

    public updateUser(user: UserRule): Observable <UserRule> {
        const uri = `http://localhost:8000/api/user/${user.i}`;
        return this.http
        .put<UserRule>(uri, user)
        .pipe(catchError(this.handleError('updateUser', user)));
    }

    public deleteUser(id: number): Observable <{}> {
        const uri = `http://localhost:8000/api/user/${id}`;
        return this.http
        .delete(uri)
        .pipe(catchError(this.handleError('deleteUser')));
    }

    
}