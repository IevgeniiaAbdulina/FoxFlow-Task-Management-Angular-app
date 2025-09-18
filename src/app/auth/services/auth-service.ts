import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  user,
  User,
} from '@angular/fire/auth';
import { UserInterface } from '@app/shared/interfaces/user-interface';
import { from, Observable } from 'rxjs';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { NotificationService } from '@app/shared/services/notification-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);
  notificationService = inject(NotificationService);

  user$: Observable<User | null> = user(this.firebaseAuth);
  readonly currentUser = signal<UserInterface | null>(null);

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {
      /* empty */
    });

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      this.router.navigateByUrl('/main');
    });
    return from(promise);
  }

  loginWithGoogle(): void {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.firebaseAuth, provider)
      .then((credential) => {
        const currUser = credential.user;

        if (!currUser) {
          this.notificationService.showErrorMessage('Google-Login error');
          throw new Error('Google-Login error');
        } else {
          this.router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.notificationService.showErrorMessage('Login with Google failed.');
        throw new Error('Google-Login error', error.message);
      });
  }

  loginWithGitHub(): void {
    const provider = new GithubAuthProvider();

    signInWithPopup(this.firebaseAuth, provider)
      .then((result) => {
        //   Access token
        const credential = result.user;
        const accessToken = credential.refreshToken;

        console.log('TOKEN:', credential, accessToken);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.notificationService.showErrorMessage('Login with GitHub failed.');
        console.error('Error during sign-in:', error.message);
      });
  }
}
