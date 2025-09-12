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
import { Router } from '@angular/router';
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

  errorMessage: string | null = null;
  colorError = '#ba1a1a';
  colorValid = '#00c853';
  readonly hide = signal<boolean>(true);

  form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), this.noSpecialChars],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(StrongPasswordRegx)],
    ],
  });

  visibilityToggle(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();

    if (this.form.invalid) {
      this.errorMessage = 'Please enter the required information.';
    } else {
      this.authService
        .register(rawForm.email, rawForm.username, rawForm.password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.log(error.code);
            this.errorMessage = error.code;
          },
        });
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);

    if (control !== undefined) {
      if (control?.hasError('required')) {
        return 'This field is required.';
      }
      if (control?.hasError('email')) {
        return 'Invalid email format.';
      }
      if (control?.hasError('minlength')) {
        return 'Username must be at least 3 characters.';
      }
      if (control?.hasError('noSpecialChars')) {
        return 'Username must contain only letters.';
      }
    }
    return null;
  }

  noSpecialChars(control: AbstractControl): ValidationErrors | null {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(control.value) ? { noSpecialChars: true } : null;
  }

  controlValidity(regex: string): RegExpMatchArray | null {
    return this.form.value.password?.match(regex) ?? null;
  }
}
