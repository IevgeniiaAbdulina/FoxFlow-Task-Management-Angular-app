import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { Auth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  const mockAuth = jasmine.createSpyObj('Auth', [
    'signInWithEmailAndPassword',
    'signOut',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: mockAuth },
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
