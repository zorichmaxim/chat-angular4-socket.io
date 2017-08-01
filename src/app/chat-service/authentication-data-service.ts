import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationDataService {

    private messageStorage: Array<Object>;
    private userName: string;

    constructor() {
        this.messageStorage = [];
    }

    get storageState() {
        return this.messageStorage;
    }

    set storageState(messagesList) {
        this.messageStorage = messagesList;
    }

    get userAuthenticationName() {
        return this.userName;
    }

    set userAuthenticationName(name) {
        this.userName = name;
    }
}
