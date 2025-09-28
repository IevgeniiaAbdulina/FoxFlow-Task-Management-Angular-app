import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Renderer2,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, NgOptimizedImage, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageSwitcherComponent } from '@app/shared/components/language-switcher/language-switcher';
import { AuthService } from '@app/auth/services/auth-service';

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
    NgOptimizedImage,
    MatTooltipModule,
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private breakpointObserver = inject(BreakpointObserver);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  readonly isDarkMode = signal(localStorage.getItem('theme') === 'dark');
  readonly isAuthenticated = this.authService.currentUser;
  readonly user = this.authService.currentUser;
  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      tap(() => this.cdr.markForCheck())
    );

  constructor() {
    this.updateTheme();
  }

  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    this.updateTheme();
  }

  getUserInitials(): string {
    const user = this.user();
    if (!user || !user.displayName) return 'U';
    const names = user.displayName.trim().split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  }

  private updateTheme(): void {
    if (this.isDarkMode()) {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
