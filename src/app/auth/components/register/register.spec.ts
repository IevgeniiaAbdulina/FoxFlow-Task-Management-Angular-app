import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { UsersService } from '@app/auth/services/users-service';
import { NotificationService } from '@app/shared/services/notification-service';
import { AuthService } from '@app/auth/services/auth-service';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockUserService: jasmine.SpyObj<UsersService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const mockAuth = jasmine.createSpyObj('Auth', [
      'signInWithEmailAndPassword',
      'signOut',
    ]);
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'register',
      'loginWithGoogle',
      'loginWithGitHub',
    ]);
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', ['']);
    mockUserService = jasmine.createSpyObj('UsersService', ['']);
    notificationSpy = jasmine.createSpyObj('NotificationService', [
      'showErrorMessage',
    ]);

    await TestBed.configureTestingModule({
      imports: [Register, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: Auth, useValue: mockAuth },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: FirebaseServiceTs, useValue: mockFirebaseService },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    const initial = component.hide();
    component.visibilityToggle(new MouseEvent('click'));
    expect(component.hide()).toBe(!initial);
  });

  it('should show error message if form is invalid on submit', () => {
    component.form.setValue({
      username: '',
      email: '',
      password: '',
    });
    component.onSubmit();
    expect(notificationSpy.showErrorMessage).toHaveBeenCalledWith(
      'Please enter the required information.'
    );
  });

  it('should call loginWithGoogle', () => {
    component.loginWithGoogle();
    expect(authServiceSpy.loginWithGoogle).toHaveBeenCalled();
  });

  it('should call loginWithGitHub', () => {
    component.loginWithGitHub();
    expect(authServiceSpy.loginWithGitHub).toHaveBeenCalled();
  });
});
