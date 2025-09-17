import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@app/auth/services/auth-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Main } from './features/components/main/main';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatCardModule,
    TranslateModule,
    Main,
  ],
  imports: [RouterOutlet, CommonModule, MatCardModule, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.authService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        if (user) {
          this.authService.currentUser.set({
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName!,
            photoURL: user.photoURL!,
          });
        } else {
          this.authService.currentUser.set(null);
        }
      });
  }
}
