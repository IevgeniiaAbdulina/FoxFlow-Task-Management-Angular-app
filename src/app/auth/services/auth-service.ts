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
import { UsersService } from '@app/auth/services/users-service';
import { MemberInterface } from '@app/shared/interfaces/member-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private usersService = inject(UsersService);

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
    ).then((response) => {
      const photo = './assets/images/person.png';
      updateProfile(response.user, { displayName: username, photoURL: photo });

      this.updateUserData(response.user, username, photo);
    });

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
          this.updateUserData(currUser);

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
        const credential = result.user;
        this.updateUserData(credential);

        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.notificationService.showErrorMessage(
          'Failed to sign in via GitHub. This email address may already exist.'
        );
        console.error('Error during sign-in:', error.message);
      });
  }

  updateUserData(userData: User, name?: string, photo?: string): void {
    const email = userData.email as string;
    const username = userData.displayName ?? (name as string);
    const userPhoto = userData.photoURL ?? (photo as string);

    this.usersService.isUserExist(email).subscribe((exists) => {
      if (!exists) {
        const newMember: MemberInterface = {
          id: userData?.uid ?? '' /* authorization id */,
          userId: '' /* firebase document id */,
          email: userData?.email ?? '',
          displayName: username,
          photoURL: userPhoto,
        };

        this.usersService.addUser(newMember);
      }
    });
  }
}
