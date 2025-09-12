import { Routes } from '@angular/router';
import { Register } from '@app/auth/components/register/register';
import { Login } from '@app/auth/components/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
