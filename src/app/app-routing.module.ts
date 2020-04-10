import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NewUserComponent} from './new-user/new-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {EditUserResolver} from './edit-user/edit-user.resolver';
import {ContactsHomeComponent} from './contacts-home/contacts-home.component';
import {ChatComponent} from './chat/chat.component';
import {AuthGuard} from './services/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'contacts-home', component: ContactsHomeComponent },
  { path: 'chats/:id', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: EditUserComponent, resolve: {data : EditUserResolver}, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
