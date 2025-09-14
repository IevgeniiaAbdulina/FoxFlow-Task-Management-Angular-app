import { Component, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth-service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  authService = inject(AuthService);
}
