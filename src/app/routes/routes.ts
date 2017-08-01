import {Routes, RouterModule}    from '@angular/router';
import {AuthenticationComponent} from 'app/authentication/authentication.component';
import {ChatComponent}           from 'app/chat-component/chat.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: "full"},
    {path: 'login', component: AuthenticationComponent},
    {path: 'chat', component: ChatComponent}
];

export const router = RouterModule.forRoot(routes);

