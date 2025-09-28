import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { UsersService } from '@app/auth/services/users-service';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockUserService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const mockAuth = jasmine.createSpyObj('Auth', [
      'signInWithEmailAndPassword',
      'signOut',
    ]);
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', ['']);
    mockUserService = jasmine.createSpyObj('UsersService', ['']);

    await TestBed.configureTestingModule({
      imports: [Register, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: Auth, useValue: mockAuth },
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
});
