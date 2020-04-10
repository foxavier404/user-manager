import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserRule } from "../service/UserRule";
import { httpError, HandleError } from './httpError';

@Injectable()
export class routeHttp {

    private handleError: HandleError;

    public constructor(
        private http: HttpClient,
        private httpErrorHandler: httpError,
    ) {
        this.handleError = httpErrorHandler.createHandleError('UserApi');
    }
    
    public getAllUsers(): Observable <UserRule[]> {
        return this.http
        .get<UserRule[]>('http://localhost:8000/UserRule')
        .pipe(catchError(this.handleError('getAllUsers', [])));
    }

    public createUser(user: UserRule): Observable <UserRule> {
        return this.http
        .post<UserRule>('http://localhost:8000/UserRule', user)
        .pipe(catchError(this.handleError('createUser', user)));
    }

    public updateUser(user: UserRule): Observable <UserRule> {
        return this.http
        .put<UserRule>('http://localhost:8000/UserRule/${user._id}', user)
        .pipe(catchError(this.handleError('updateUser', user)));
    }

    public deleteUser(id: number): Observable <{}> {
        const uri = `http://localhost:8000/UserRule/${id}`;
        return this.http
        .delete(uri)
        .pipe(catchError(this.handleError('deleteUser')));
    }

}