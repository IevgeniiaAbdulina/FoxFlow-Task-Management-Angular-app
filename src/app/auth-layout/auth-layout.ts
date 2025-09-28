import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@app/shared/components/sidebar/sidebar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    MatSidenavModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  readonly sidenav = viewChild.required(MatSidenav);
  readonly isSidebarOpen = signal(true);

  readonly isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.sidenav().toggle();
    } else {
      this.isSidebarOpen.set(!this.isSidebarOpen());
    }
  }
}
