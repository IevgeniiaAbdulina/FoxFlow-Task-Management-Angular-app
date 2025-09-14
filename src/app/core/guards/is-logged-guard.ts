import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth-service';
import { map, Observable, take } from 'rxjs';

export const isLoggedGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => {
      if (user) {
        console.log('access');
        router.navigate(['/home']);
        return true;
      } else {
        console.log('access denied');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
