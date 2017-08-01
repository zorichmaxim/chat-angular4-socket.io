import {Injectable} from '@angular/core';
import {Socket} from 'ng2-socket-io';

@Injectable()
export class ChatSocket extends Socket {

    constructor() {
        super({url: 'http://localhost:4200/chat', options: {}});
    }

}

@Injectable()
export class AuthenticationSocket extends Socket {

    constructor() {
        super({url: 'http://localhost:4200/login', options: {}});
    }

}
