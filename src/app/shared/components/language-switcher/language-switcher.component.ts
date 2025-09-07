import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  protected readonly translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'pl']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();

    this.translate.use(
      savedLang || (browserLang?.match(/en|pl/) ? browserLang : 'en')
    );
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
