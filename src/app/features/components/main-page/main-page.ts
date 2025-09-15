import { Component, inject, OnInit, signal } from '@angular/core';
import { LanguageSwitcherComponent } from '@app/shared/components/language-switcher/language-switcher.component';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-main-page',
  imports: [
    LanguageSwitcherComponent,
    MatCard,
    RouterLink,
    TranslateModule,
    MatButton,
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  firebaseService = inject(FirebaseServiceTs);

  protected readonly testConnection = signal('');

  ngOnInit(): void {
    this.firebaseService.getTestConnection().subscribe((documents) => {
      const firstDoc = documents[0];
      this.testConnection.set(firstDoc?.['text'] ?? '');
    });
  }
}
