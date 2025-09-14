import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseServiceTs } from './services/firebase/firebase-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatCardModule,
    TranslateModule,
    HeaderComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  protected readonly title = signal('FoxFlow');
  protected readonly testConnection = signal('');

  firebaseService = inject(FirebaseServiceTs);

  ngOnInit(): void {
    this.firebaseService.getTestConnection().subscribe((documents) => {
      const firstDoc = documents[0];
      this.testConnection.set(firstDoc?.['text'] ?? '');
    });
  }
}
