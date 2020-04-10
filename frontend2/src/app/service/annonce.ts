import { Injectable } from '@angular/core';

import { LocalStorageService } from './localStorageservice';

@Injectable()
export class Annonce {

    public incomingMessage: any;
    private messages: any[] = [];

    constructor(
        private localStorageService: LocalStorageService,
    ) {

    }

    public async add(message: any) {
        this.incomingMessage = message;
        this.messages.push(message);
        await this.localStorageService.storeNewMessageOnLocalStorage(message);
    }

    public async deleteMessages() {
        this.messages = [];
        await this.localStorageService.deleteAllMessagesOnLocalStorage();
    }
}