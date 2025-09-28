import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';
// import { CommonModule, NgOptimizedImage } from '@angular/common';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { MatMenuModule } from '@angular/material/menu';
// import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';
import { AuthService } from '@app/auth/services/auth-service';
//import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { BreakpointState } from '@angular/cdk/layout';
//import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
//import { UsersService } from '@app/auth/services/users-service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockBreakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser: signal(null),
    });
    mockBreakpointObserver = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
    ]);
    mockBreakpointObserver.observe.and.returnValue(
      of({
        matches: true,
        breakpoints: {
          [Breakpoints.Handset]: true,
        },
      })
    );

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should show login/register menu on mobile when not authenticated', () => {
    mockAuthService.currentUser.set(null);
    mockBreakpointObserver.observe.and.returnValue(of({ matches: true, breakpoints: {
      [Breakpoints.Handset]: true }, }));
    fixture.detectChanges();

    const loginMenu = fixture.nativeElement.querySelector('.mobile-login-menu');
    expect(loginMenu).toBeTruthy();
  }); */

  /*it('should show login/register nav-links on desktop when not authenticated', () => {
    mockAuthService.currentUser.set(null);
    mockBreakpointObserver.observe.and.returnValue(of({ matches: false, breakpoints: {
      [Breakpoints.Handset]: false }, }));
    fixture.detectChanges();

    const loginLinks = fixture.nativeElement.querySelector('.nav-links');
    expect(loginLinks).toBeTruthy();
  }); */

  /*it('should show user avatar, email tooltip, and logout button on desktop when authenticated', () => {
    mockAuthService.currentUser.set({
      email: 'test@example.com',
      photoURL: 'avatar.jpg',
      displayName: 'Test User',
      uid: 'userId'
    });
    mockBreakpointObserver.observe.and.returnValue(of({ matches: false, breakpoints: {
      [Breakpoints.Handset]: true }, }));
    fixture.detectChanges();

    const avatar = fixture.nativeElement.querySelector('.user-avatar');
    const tooltip = fixture.nativeElement.querySelector('.email-tooltip');
    const logoutBtn = fixture.nativeElement.querySelector('.logout-button');

    expect(avatar).toBeTruthy();
    expect(tooltip.textContent).toContain('test@example.com');
    expect(logoutBtn).toBeTruthy();
  }); */

  /*it('should show user initials and logout menu on mobile when authenticated and photoURL is null', () => {
    mockAuthService.currentUser.set({
      email: 'test@example.com',
      photoURL: 'avatar.jpg',
      displayName: 'Test User',
      uid: 'userId'
    });
    mockBreakpointObserver.observe.and.returnValue(of({ matches: true,  breakpoints: {
      [Breakpoints.Handset]: true }, }));
    fixture.detectChanges();

    const initials = fixture.nativeElement.querySelector('.user-initials');
    const logoutMenu = fixture.nativeElement.querySelector('.mobile-logout-menu');

    expect(initials.textContent).toContain('TU');
    expect(logoutMenu).toBeTruthy();
  }); */

  it('should show user avatar when photoURL is provided', () => {
    mockAuthService.currentUser.set({
      email: 'test@example.com',
      photoURL: 'avatar.jpg',
      displayName: 'Test User',
      uid: 'userId',
    });

    fixture.detectChanges();

    const avatar: HTMLImageElement =
      fixture.nativeElement.querySelector('.user-avatar');
    expect(avatar).toBeTruthy();
    expect(avatar.src).toContain('avatar.jpg');
  });

  it('should toggle theme correctly', () => {
    const initialTheme = component.isDarkMode();
    component.toggleTheme();
    expect(component.isDarkMode()).toBe(!initialTheme);
  });

  it('should return correct initials from displayName', () => {
    mockAuthService.currentUser.set({
      displayName: 'John Doe',
      uid: 'userId',
      email: 'test@example.com',
    });
    expect(component.getUserInitials()).toBe('JD');
  });

  it('should logout when logout is called', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
