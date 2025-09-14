import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { LanguageSwitcherComponent } from '@app/shared/components/language-switcher/language-switcher.component';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@app/auth/services/auth-service';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-main-page',
  imports: [
    AsyncPipe,
    LanguageSwitcherComponent,
    MatCard,
    NgOptimizedImage,
    RouterLink,
    TranslateModule,
    MatButton,
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  firebaseService = inject(FirebaseServiceTs);
  authService = inject(AuthService);

  protected readonly testConnection = signal('');

  ngOnInit(): void {
    this.firebaseService.getTestConnection().subscribe((documents) => {
      const firstDoc = documents[0];
      this.testConnection.set(firstDoc?.['text'] ?? '');
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
