import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';
import { AuthService } from '@app/auth/services/auth-service';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointState } from '@angular/cdk/layout';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let breakpointSubject: Subject<BreakpointState>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    breakpointSubject = new Subject();
    authService = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser: signal(null),
    });

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        CommonModule,
        RouterLink,
        RouterLinkActive,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatTooltipModule,
        TranslateModule.forRoot(),
        MatMenuModule,
        LanguageSwitcherComponent,
        NgOptimizedImage,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: {
            observe: (): import('rxjs').Observable<
              import('@angular/cdk/layout').BreakpointState
            > => breakpointSubject.asObservable(),
          },
        },
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login/register menu on mobile when not authenticated', () => {
    authService.currentUser.set(null);
    breakpointSubject.next({ matches: true });
    fixture.detectChanges();
    const menuButton = fixture.debugElement.query(
      By.css('button[matMenuTriggerFor="menu"]')
    );
    expect(menuButton.attributes['aria-label']).toBe('Open navigation menu');
    menuButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const menuItems = fixture.debugElement.queryAll(
      By.css('button[mat-menu-item]')
    );
    expect(menuItems.length).toBe(2);
    expect(menuItems[0].nativeElement.textContent).toContain('AUTH.LOGIN');
    expect(menuItems[1].nativeElement.textContent).toContain('AUTH.REGISTER');
  });

  it('should show login/register nav-links on desktop when not authenticated', () => {
    authService.currentUser.set(null);
    breakpointSubject.next({ matches: false });
    fixture.detectChanges();
    const navLinks = fixture.debugElement.query(By.css('.nav-links'));
    expect(navLinks).toBeTruthy();
    const links = navLinks.queryAll(By.css('a[mat-button]'));
    expect(links.length).toBe(2);
    expect(links[0].attributes['aria-label']).toBe('Log in');
    expect(links[1].attributes['aria-label']).toBe('Register');
  });

  it('should show user avatar, email tooltip, and logout button on desktop when authenticated', () => {
    authService.currentUser.set({
      uid: 'test-uid',
      displayName: 'John Doe',
      email: 'john@example.com',
      photoURL: 'avatar.jpg',
    });
    breakpointSubject.next({ matches: false });
    fixture.detectChanges();
    const userInfo = fixture.debugElement.query(By.css('.user-info'));
    expect(userInfo.attributes['matTooltip']).toBe('john@example.com');
    const avatar = userInfo.query(By.css('img.user-avatar'));
    expect(avatar.attributes['ngSrc']).toBe('avatar.jpg');
    const logoutButton = fixture.debugElement.query(
      By.css('button[mat-icon-button][aria-label="Log out"]')
    );
    expect(logoutButton).toBeTruthy();
    logoutButton.triggerEventHandler('click', null);
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should show user initials and logout menu on mobile when authenticated and photoURL is null', () => {
    authService.currentUser.set({
      uid: 'test-uid',
      displayName: 'John Doe',
      email: 'john@example.com',
      photoURL: undefined,
    });
    breakpointSubject.next({ matches: true });
    fixture.detectChanges();
    const headerContainer = fixture.debugElement.query(
      By.css('.header-container')
    );
    const children = headerContainer.queryAll(By.css('*'));
    expect(children[0].nativeElement.tagName.toLowerCase()).toBe('a'); // Logo
    expect(children[1].nativeElement.tagName.toLowerCase()).toBe('span'); // Spacer
    expect(children[2].nativeElement.tagName.toLowerCase()).toBe(
      'app-language-switcher'
    );
    expect(children[3].nativeElement.tagName.toLowerCase()).toBe(
      'mat-slide-toggle'
    );
    expect(children[4].nativeElement.tagName.toLowerCase()).toBe('div'); // User info
    expect(children[5].nativeElement.tagName.toLowerCase()).toBe('button'); // Menu button
    const userInfo = fixture.debugElement.query(By.css('.user-info'));
    expect(userInfo.attributes['matTooltip']).toBe('john@example.com');
    const initials = userInfo.query(By.css('span.user-initials'));
    expect(initials.nativeElement.textContent).toBe('JD');
    const menuButton = fixture.debugElement.query(
      By.css('button[matMenuTriggerFor="userMenu"]')
    );
    menuButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const menuItems = fixture.debugElement.queryAll(
      By.css('button[mat-menu-item]')
    );
    expect(menuItems.length).toBe(1);
    expect(menuItems[0].nativeElement.textContent).toContain('AUTH.LOGOUT');
  });

  it('should show user avatar when photoURL is provided', () => {
    authService.currentUser.set({
      uid: 'test-uid',
      displayName: 'John Doe',
      email: 'john@example.com',
      photoURL: 'avatar.jpg',
    });
    breakpointSubject.next({ matches: true });
    fixture.detectChanges();
    const userInfo = fixture.debugElement.query(By.css('.user-info'));
    const avatar = userInfo.query(By.css('img.user-avatar'));
    expect(avatar).toBeTruthy();
    expect(avatar.attributes['ngSrc']).toBe('avatar.jpg');
    const initials = userInfo.query(By.css('span.user-initials'));
    expect(initials).toBeNull();
  });
});
