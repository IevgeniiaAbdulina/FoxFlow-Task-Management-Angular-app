import { Routes } from '@angular/router';
import { Register } from '@app/auth/components/register/register';
import { Login } from '@app/auth/components/login/login';
import { MainPage } from '@app/features/components/main-page/main-page';
import { HomePage } from '@app/features/components/home-page/home-page';
import { authGuard } from '@app/core/guards/auth-guard';
import { isLoggedGuard } from '@app/core/guards/is-logged-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'main',
    component: MainPage,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [authGuard],
  },
];
