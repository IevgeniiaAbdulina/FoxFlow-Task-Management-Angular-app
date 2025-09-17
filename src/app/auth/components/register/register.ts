import {
  Component,
  DestroyRef,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/auth/services/auth-service';
import { HighlightMessage } from '@app/shared/directives/highlight-message';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StrongPasswordRegx } from '@app/shared/utils/strong-password-regx';
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
    RouterLink,
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

  readonly errorMessage = signal<string | null>(null);
  colorError = '#ba1a1a';
  colorValid = '#00c853';
  readonly hide = signal<boolean>(true);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(StrongPasswordRegx)],
    ],
  });

  visibilityToggle(event: MouseEvent): void {
    this.hide.update((value) => !value);
    event.stopPropagation();
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();

    if (this.form.invalid) {
      this.errorMessage.set('Please enter the required information.');
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

  controlValidity(regex: string): RegExpMatchArray | null {
    return this.form.value.password?.match(regex) ?? null;
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithGitHub(): void {
    this.authService.loginWithGitHub();
  }
}
