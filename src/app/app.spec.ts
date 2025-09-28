import { TestBed } from '@angular/core/testing';
import { App } from './app';

import { Auth } from '@angular/fire/auth';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { AuthService } from './auth/services/auth-service';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('App', () => {
  const mockAuth = jasmine.createSpyObj('Auth', [
    'signInWithEmailAndPassword',
    'signOut',
  ]);

  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'http://example.com/photo.jpg',
    };
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', ['']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['currentUser'], {
      user$: of(mockUser), // или of(mockUser) для имитации авторизованного пользователя
    });

    await TestBed.configureTestingModule({
      imports: [App, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        provideRouter(routes),
        { provide: Auth, useValue: mockAuth },
        { provide: AuthService, useValue: mockAuthService },
        { provide: FirebaseServiceTs, useValue: mockFirebaseService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, foxflow'
    );
  });
});
