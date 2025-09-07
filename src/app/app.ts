import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseServiceTs } from './services/firebase/firebase-service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  protected readonly title = signal('FoxFlow');
  protected readonly testConnection = signal('');

  firebaseService = inject(FirebaseServiceTs);
  protected translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.addLangs(['en', 'pl']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();

    this.translate.use(
      savedLang || (browserLang?.match(/en|pl/) ? browserLang : 'en')
    );

    this.firebaseService.getTestConnection().subscribe((documents) => {
      const firstDoc = documents[0];
      this.testConnection.set(firstDoc?.['text'] ?? '');
    });
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
