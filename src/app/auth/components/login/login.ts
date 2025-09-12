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
import { UpperCasePipe } from '@angular/common';
import { CapitalizeFirstLetter } from '@app/shared/utils/capitalize-first-letter';

@Component({
  selector: 'app-login',
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
    UpperCasePipe,
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
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.log(error.code);
            const code = error.code.split('/')[0];
            const reason = error.code.split('/')[1].split('-').join(' ');
            const errorMessage = CapitalizeFirstLetter(reason);

            this.errorMessage.set(
              `The ${code} error occurred. ${errorMessage}.`
            );
            this.form.reset();
          },
        });
    }
  }
}
