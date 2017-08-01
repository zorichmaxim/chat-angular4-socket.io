import {Component, OnInit} from '@angular/core';
import {ChatService} from '../chat-services/chat.service';
import {Socket} from 'ng-socket-io';
import {Router} from '@angular/router';
import {AuthenticationDataService} from '../chat-services/authentication-data-service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css'],
    host: {
        '(document:keydown)': 'handleEnterEvent($event)'
    }
})
export class AuthenticationComponent implements OnInit {
    private userName: string;
    private userPassword: string;

    constructor(private chatService: ChatService,
                private socket: Socket,
                private router: Router,
                private dataService: AuthenticationDataService) {
    }

    ngOnInit() {
    }

    formSubmit(name, password) {
        this.chatService.authentication(name);
        this.socket.on('authentication done', (res) => {
            this.dataService.storageState = res.results;
            this.dataService.userAuthenticationName = res.user;
            this.router.navigate(['chat']);
        });

        this.socket.on('name is busy', () => {
            console.log('name is field');
        })
    }

    handleEnterEvent(event) {
        if (event.keyCode === 13) {
            this.formSubmit(this.userName, this.userPassword);
        }
    }
}
