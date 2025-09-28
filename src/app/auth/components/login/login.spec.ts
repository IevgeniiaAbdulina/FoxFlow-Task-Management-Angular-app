import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { UsersService } from '@app/auth/services/users-service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockUserService: jasmine.SpyObj<UsersService>;
  mockUserService = jasmine.createSpyObj('UsersService', ['']);

  beforeEach(async () => {
    const mockAuth = jasmine.createSpyObj('Auth', [
      'signInWithEmailAndPassword',
      'signOut',
    ]);
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', ['']);
    mockUserService = jasmine.createSpyObj('UsersService', ['']);

    await TestBed.configureTestingModule({
      imports: [Login, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: Auth, useValue: mockAuth },
        { provide: FirebaseServiceTs, useValue: mockFirebaseService },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
