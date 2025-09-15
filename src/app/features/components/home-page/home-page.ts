import { Component, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth-service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  authService = inject(AuthService);
}
