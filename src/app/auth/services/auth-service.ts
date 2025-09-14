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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);

  user$: Observable<User | null> = user(this.firebaseAuth);
  readonly currentUser = signal<UserInterface | null | undefined>(undefined);

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
    const promise = signOut(this.firebaseAuth);
    this.router.navigate(['/']);

    return from(promise);
  }

  loginWithGoogle(): void {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.firebaseAuth, provider)
      .then((credential) => {
        const currUser = credential.user;

        if (!currUser) {
          throw new Error('Google-Login error');
        } else {
          this.router.navigate(['/home']);
        }
      })
      .catch((error) => {
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
        console.error('Error during sign-in:', error.message);
      });
  }
}
