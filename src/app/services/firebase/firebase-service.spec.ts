import { TestBed } from '@angular/core/testing';

import { FirebaseServiceTs } from './firebase-service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

describe('FirebaseServiceTs', () => {
  let service: FirebaseServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirebaseServiceTs,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(FirebaseServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
