import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth-service';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [NgOptimizedImage],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private authService = inject(AuthService);
  readonly user$ = toSignal(this.authService.user$, {
    initialValue: null,
  });

  logout(): void {
    this.authService.logout();
  }
}
