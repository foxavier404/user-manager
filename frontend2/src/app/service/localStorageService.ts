import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { UserRule } from "./UserRule";
import * as types from './UserProfileModuleActionTypes';
import * as keys from './localStorageKeys';

@Injectable()
export class LocalStorageService {

    public tab: any[] = [];
    public currentUser: UserRule;
    public allUsers = [];
    public authData: any;
    public authState: boolean;
    public first_connexion: boolean;
    public errorMessages: any[] = [];
     
    constructor(
        @Inject(LOCAL_STORAGE) private storage: StorageService
    ) { }     
     
    public storeAllUsersOnLocalStorage(users: UserRule[]): void {
        
        // get array of users from local storage
        this.allUsers = this.storage.get(keys.STORAGE_KEY_USERS) || [];         
        
        // push new task to array
        this.allUsers =  users;
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_USERS, this.allUsers);              
    }

    public storeOneUserOnLocalStorage(user: UserRule): void {
        
        // get array of users from local storage
        this.allUsers = this.storage.get(keys.STORAGE_KEY_USERS) || [];         
        
        // push new user to array
        this.allUsers.push(user);
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_USERS, this.allUsers);            
    }

    public storeAuthStateOnLocalStorage(authState: boolean): void {
        
        // get memory to store authState from local storage
        this.authState = this.storage.get(keys.STORAGE_KEY_AUTH_STATE) || undefined;         
        
        // update authState
        this.authState =  authState;
        
        // insert updated authState to local storage
        this.storage.set(keys.STORAGE_KEY_AUTH_STATE, this.authState);

        if(authState)
            this.notify([types.CONNECT_USER]);
    }

    public storeCurrentUserOnLocalStorage(currentUser: UserRule): void {
        
        // get memory to store currentUser from local storage
        this.currentUser = this.storage.get(keys.STORAGE_KEY_CURRENT_USER) || undefined;         
        
        // update currentUser
        this.currentUser =  currentUser;
        
        // insert updated currentUser to local storage
        this.storage.set(keys.STORAGE_KEY_CURRENT_USER, this.currentUser); 
        
        this.storeAuthDataOnLocalStorage({email: currentUser.email, password: currentUser.password});
    }

    public storeFirstConnexionOnLocalStorage(first_connexion: boolean): void {
        
        // get memory to store first_connexion state from local storage
        this.first_connexion = this.storage.get(keys.STORAGE_KEY_FIRST_CONNEXION) || undefined;         
        
        // update first_connexion
        this.first_connexion =  first_connexion;
        
        // insert updated first_connexion to local storage
        this.storage.set(keys.STORAGE_KEY_FIRST_CONNEXION, this.first_connexion);
    }

    public storeAuthDataOnLocalStorage(authData: any): void {
        
        // get memory to store authData from local storage
        this.authData = this.storage.get(keys.STORAGE_KEY_AUTH_DATA) || {};         
        
        // update authData
        this.authData =  authData;
        
        // insert updated authData to local storage
        this.storage.set(keys.STORAGE_KEY_AUTH_DATA, this.authData);
    }

    public storeNewMessageOnLocalStorage(message: any): void {
        
        // get array of messages from local storage
        this.errorMessages = this.storage.get(keys.STORAGE_KEY_MESSAGES) || [];         
        
        // push incoming message to array
        this.errorMessages.push(message);
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_MESSAGES, this.errorMessages);

        this.notify([types.NEW_MESSAGE]);  
    }

    public deleteMessageOnLocalStorage(message: any): void {
        // delete the incoming message
        this.errorMessages = this.errorMessages.filter(m => (m.type !== message.type) && (m.service !== message.service) && (m.operation !== message.operation) && (m.message !== message.message));
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_MESSAGES, this.errorMessages);            
    }

    public deleteAllMessagesOnLocalStorage(): void {
        
        // delete the all messages
        this.errorMessages = [];
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_MESSAGES, this.errorMessages);            
    }

    //Get messages from local storage
    public getAllMessages() {
        return (this.storage.get(keys.STORAGE_KEY_MESSAGES) || []);
    }

    //Get authData from local storage
    public getCurrentAuthData() {
        return (this.storage.get(keys.STORAGE_KEY_AUTH_DATA) || {});
    }

    //Get first connexion from local storage
    public getCurrentUserFirstConnexion() {
        return (this.storage.get(keys.STORAGE_KEY_FIRST_CONNEXION) || undefined);
    }

    //Get currentUser from local storage
    public getCurrentUserOnLocalStorage() {
        return (this.storage.get(keys.STORAGE_KEY_CURRENT_USER) || null);
    }

    //Get allUsers from local storage
    public getAllUsersOnLocalStorage() {
        return (this.storage.get(keys.STORAGE_KEY_USERS) || []);
    }

    //Get authentification state from local storage
    public getAuthStateOnLocalStorage() {
        return (this.storage.get(keys.STORAGE_KEY_AUTH_STATE) || undefined);
    }

    //Suscribe a componnent into the local storage
    public suscribe(f: any) {
        this.tab.push(f);
    }

    //Notify all suscribers that a mutation have been done
    public notify(types: string[]) {
        this.tab.forEach(f => {
            types.forEach(type => {
                f.updateAll(type);
            });
        });
    }
}