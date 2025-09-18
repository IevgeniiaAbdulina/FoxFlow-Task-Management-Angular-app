import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$: Observable<string> = this.currentLangSubject.asObservable();

  constructor() {
    this.translate.addLangs(['en', 'pl']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    const initialLang =
      savedLang || (browserLang?.match(/en|pl/) ? browserLang : 'en');

    this.translate.use(initialLang);
    this.currentLangSubject.next(initialLang);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLangSubject.next(lang);
  }
}
