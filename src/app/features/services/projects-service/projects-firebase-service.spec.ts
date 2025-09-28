import { TestBed } from '@angular/core/testing';

import { ProjectsFirebaseService } from './projects-firebase-service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Auth } from '@angular/fire/auth';

describe('ProjectsFirebaseService', () => {
  let service: ProjectsFirebaseService;
  const mockAuth = jasmine.createSpyObj('Auth', [
    'signInWithEmailAndPassword',
    'signOut',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsFirebaseService,
        { provide: Auth, useValue: mockAuth },
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(ProjectsFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
