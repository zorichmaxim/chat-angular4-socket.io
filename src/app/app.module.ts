import {BrowserModule}                    from '@angular/platform-browser';
import {NgModule}                         from '@angular/core';
import {FormsModule}                      from '@angular/forms';
import {AppComponent}                     from 'app/app.component';
import {SocketIoModule, SocketIoConfig}   from 'ng-socket-io';
import {ChatService}                      from 'app/chat-services/chat.service';
import {AuthenticationSocket, ChatSocket} from 'app/chat-services/enter-points';
import {AuthenticationDataService}        from 'app/chat-services/authentication-data-service';
import {ChatComponent}                    from 'app/chat-component/chat.component';
import {AuthenticationComponent}          from 'app/authentication/authentication.component';
import {router}                           from 'app/routes/routes';

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
