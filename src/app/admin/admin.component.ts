import {Component, OnInit}         from '@angular/core';
import {ChatService}               from '../chat-services/chat.service';
import {Socket}                    from 'ng-socket-io';
import {AuthenticationDataService} from '../chat-services/authentication-data-service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    host: {
        '(document:keydown)': 'handleEnterEvent($event)'
    }
})
export class AdminComponent implements OnInit {

    private userMessageList: Array<Object>;
    private userState; //умышленно, не пускает вебпак, посмотреть конфиги
    private message: string;

    constructor(private chatService: ChatService,
                private socket: Socket,
                private dataService: AuthenticationDataService) {
        this.userState = {};
        this.userMessageList = [];
    }

    ngOnInit() {
        this.userMessageList = this.dataService.storageState;
        this.userState.name = this.dataService.userAuthenticationName;
        this.socket.on('chat message from io', msg => {
            this.displayNewMessage(msg);
        });
        this.clingToBottom();
    }

    displayNewMessage(msg): void {
        this.userMessageList.push(msg);
    }

    sendNewMessage(message): void {
        let userData = {
            message,
            name: this.userState.name,
        };
        message !== '' ? this.chatService.msgClient(userData) : false;
        this.message = '';
        this.clingToBottom();
    }

    handleEnterEvent(event): void {
        if (event.keyCode === 13) {
            this.sendNewMessage(this.message);
        }
    }

    clingToBottom(): void{
        window.scrollTo(0, document.body.scrollHeight);
    }
}
