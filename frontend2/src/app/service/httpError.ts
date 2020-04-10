import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Annonce } from './annonce';

export type HandleError = <T> (
    operation?: string,
    result?: T
) => (error: HttpErrorResponse) => Observable <T>;

@Injectable()
export class httpError {
    public constructor(private messageService: Annonce) {};

    public createHandleError: any = (serviceName = '') => <T> (
        operation = 'operation',
        result = {} as T
    ) => this.handleError(serviceName, operation, result); 

    handleError <T>(serviceName = '', operation = 'operation', result = {} as T) {
        return (error: HttpErrorResponse): Observable <T> => {

            const message = error.error instanceof ErrorEvent
                            ? error.error.message
                            : `Server returned code ${ error.status } with request body "${ error.error }"`;
            this.messageService.add({
                type: 'error',
                service: serviceName,
                operation: operation,
                message : message,
            });

            return of(result as T);
        }
    };
}
