import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ChatService} from 'app/chat-service/chat.service';
import {SocketIoModule, SocketIoConfig} from 'ng-socket-io';
import {AuthenticationSocket, ChatSocket} from 'app/chat-service/enter-points';
import {ChatComponent} from './chat-component/chat.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {router} from 'app/routes/routes';
import {AuthenticationDataService} from 'app/chat-service/authentication-data-service';

const config: SocketIoConfig = {url: 'http://localhost:4200', options: {}};

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        AuthenticationComponent
    ],
    imports: [
        BrowserModule,
        SocketIoModule.forRoot(config),
        FormsModule,
        router
    ],
    providers: [ChatService, AuthenticationSocket, ChatSocket, AuthenticationDataService],
    bootstrap: [AppComponent]
})
export class AppModule {}
