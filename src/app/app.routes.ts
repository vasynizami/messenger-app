import { Routes } from '@angular/router';
import { MyMessenger } from './components/my-messenger/my-messenger';
import { Login } from './components/login/login';
import { Logout } from './components/logout/logout';
import { Signup } from './components/signup/signup';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/messenger',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'logout',
    component: Logout,
  },
  {
    path: 'messenger',
    component: MyMessenger,
  },
];
