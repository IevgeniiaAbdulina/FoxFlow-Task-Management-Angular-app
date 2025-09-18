import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth-service';
import { map, Observable, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => !!user),
    tap((loggedIn) => {
      if (!loggedIn) {
        console.log('access denied');
        router.navigate(['/login']);
      }
    })
  );
};
