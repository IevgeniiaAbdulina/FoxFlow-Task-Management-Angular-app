import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { AuthService } from '@app/auth/services/auth-service';

import { Main } from './features/components/main/main';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatCardModule,
    TranslateModule,
    RouterLink,
    LanguageSwitcherComponent,
    Main,
    NgOptimizedImage,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
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
      console.log(this.authService.currentUser());
    });
  }
}
