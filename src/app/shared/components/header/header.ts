import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    TranslateModule,
    MatMenuModule,
    LanguageSwitcherComponent,
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private cdr = inject(ChangeDetectorRef);
  isDarkMode = false;
  isMobile$: Observable<boolean> = inject(BreakpointObserver)
    .observe([Breakpoints.Handset])
    .pipe(map((result) => result.matches));

  constructor() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateTheme();
  }

  private readonly isAuthenticatedValue = false;

  get isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
    this.cdr.markForCheck();
  }

  private updateTheme(): void {
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }
}
