import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Socket} from 'ng-socket-io';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) {
    }

    msgClient(userData): void {
        this.socket.emit("chat msg from client", userData)
    }

    authentication(name: string): void {
        this.socket.emit('authentication', name);
    }
}
