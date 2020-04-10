import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserRule } from "../service/UserRule";
import { httpError, HandleError } from './httpError';

import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    private handleError: HandleError;

    public constructor(
        private http: HttpClient,
        private httpErrorHandler: httpError,
        private router: Router,
    ) {
        this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

    public login(email: string, password: string): Observable <UserRule[]> {
        const uri = `http://localhost:8000/api/user/connexion/${email}/${password}`;
        return this.http
        .get<UserRule[]>(uri)
        .pipe(catchError(this.handleError('login', [])));
    }
}