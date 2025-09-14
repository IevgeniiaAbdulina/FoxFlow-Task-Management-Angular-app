import { Routes } from '@angular/router';

export const routes: Routes = [
  //   {
  //     path: '',
  //     loadComponent: () =>
  //       import('./features/components/home/home').then((c) => c.HomeComponent),
  //   },
  //   {
  //     path: 'login',
  //     loadComponent: () =>
  //       import('./auth/components/login/login').then((c) => c.LoginComponent),
  //   },
  //   {
  //     path: 'register',
  //     loadComponent: () =>
  //       import('./auth/components/register/register').then(
  //         (c) => c.RegisterComponent
  //       ),
  //   },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found').then(
        (c) => c.NotFoundComponent
      ),
  },
];
