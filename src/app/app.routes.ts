import { Routes } from '@angular/router';
import { Register } from '@app/auth/components/register/register';
import { Login } from '@app/auth/components/login/login';
import { HomePage } from '@app/features/components/home-page/home-page';
import { authGuard } from '@app/core/guards/auth-guard';
import { isLoggedGuard } from '@app/core/guards/is-logged-guard';
import { Main } from '@app/features/components/main/main';
import { MainPage } from '@app/features/components/main-page/main-page';

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
    component: Main,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'main-page',
    component: MainPage,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [authGuard],
  },
];
