import {
  Component,
  DestroyRef,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/auth/services/auth-service';
import { HighlightMessage } from '@app/shared/directives/highlight-message';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { SocialButtonGoogle } from '@app/shared/components/social-button-google/social-button-google';
import { SocialButtonGithub } from '@app/shared/components/social-button-github/social-button-github';
import { Divider } from '@app/shared/components/divider/divider';
import { UpperCasePipe } from '@angular/common';
import { NotificationService } from '@app/shared/services/notification-service';
import { FirebaseError } from '@firebase/util';
import { FormatErrorMessage } from '@app/shared/utils/format-error-message';
import { MatTooltip } from '@angular/material/tooltip';
import { passwordValidator } from '@app/shared/utils/password-validator';

@Component({
  selector: 'app-register',
  imports: [
    HighlightMessage,
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
    SocialButtonGoogle,
    SocialButtonGithub,
    Divider,
    UpperCasePipe,
    MatTooltip,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  notificationService = inject(NotificationService);

  colorError = '#ba1a1a';
  colorValid = '#00c853';
  readonly hide = signal<boolean>(true);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator()]],
  });

  passwordRequirements = [
    { key: 'min_length', message: 'At least 8 characters long.' },
    { key: 'uppercase', message: 'At least one uppercase letter.' },
    { key: 'lowercase', message: 'At least one lowercase letter.' },
    { key: 'digit', message: 'At least one digit.' },
    {
      key: 'specialChar',
      message: 'At least one special character (!@#$%^&*).',
    },
  ];

  hasError(errorKey: string): boolean {
    const errors = this.form.get('password')?.errors;
    return !!errors && errors[errorKey];
  }

  visibilityToggle(event: MouseEvent): void {
    this.hide.update((value) => !value);
    event.stopPropagation();
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();

    if (this.form.invalid) {
      const errorMessage = 'Please enter the required information.';
      this.notificationService.showErrorMessage(errorMessage);
    } else {
      this.authService
        .register(rawForm.email, rawForm.username, rawForm.password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
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

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithGitHub(): void {
    this.authService.loginWithGitHub();
  }
}
