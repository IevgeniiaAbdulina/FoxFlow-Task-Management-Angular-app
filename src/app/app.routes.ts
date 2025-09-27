import { Routes } from '@angular/router';
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
    loadComponent: () =>
      import('@app/auth/components/login/login').then((m) => m.Login),
    canActivate: [isLoggedGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@app/auth/components/register/register').then((m) => m.Register),
    canActivate: [isLoggedGuard],
  },
  {
    path: 'main',
    loadComponent: () =>
      import('@app/features/components/main/main').then((m) => m.Main),
    canActivate: [isLoggedGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('@app/auth-layout/auth-layout').then((m) => m.AuthLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('@app/features/components/home-page/home-page').then(
            (m) => m.HomePage
          ),
      },
      {
        path: 'project/:id',
        loadComponent: () =>
          import('@app/features/components/project-page/project-page').then(
            (m) => m.ProjectPage
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found').then(
        (m) => m.NotFoundComponent
      ),
  },
];
