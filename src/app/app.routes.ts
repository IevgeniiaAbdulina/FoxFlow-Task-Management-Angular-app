import { Routes } from '@angular/router';
import { Register } from '@app/auth/components/register/register';
import { Login } from '@app/auth/components/login/login';
import { MainPage } from '@app/features/components/main-page/main-page';
import { HomePage } from '@app/features/components/home-page/home-page';
import { authGuard } from '@app/core/guards/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: HomePage, canActivate: [authGuard] },
];
