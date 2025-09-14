import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/auth/services/auth-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { SocialButtonGithub } from '@app/shared/components/social-button-github/social-button-github';
import { SocialButtonGoogle } from '@app/shared/components/social-button-google/social-button-google';
import { Divider } from '@app/shared/components/divider/divider';
import { UpperCasePipe } from '@angular/common';
import { NotificationService } from '@app/shared/services/notification-service';
import { FormatErrorMessage } from '@app/shared/utils/format-error-message';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatCardModule,
    TranslateModule,
    SocialButtonGithub,
    SocialButtonGoogle,
    Divider,
    UpperCasePipe,
    RouterLink,
    MatTooltip,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  notificationService = inject(NotificationService);

  readonly errorMessage = signal<string | null>(null);
  readonly hide = signal<boolean>(true);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  visibilityToggle(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();

    if (this.form.invalid) {
      this.errorMessage.set('Please enter the required information.');
    } else {
      this.authService
        .login(rawForm.email, rawForm.password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(
              `Welcome back ${this.authService.currentUser()?.displayName ?? ''}!`
            );
            this.router.navigate(['/home']);
          },
          error: (error: FirebaseError) => {
            const errorMessage = FormatErrorMessage(error);
            this.notificationService.showErrorMessage(errorMessage);

            this.form.reset();
          },
        });
    }
  }
}
