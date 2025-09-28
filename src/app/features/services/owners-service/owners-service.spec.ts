import { TestBed } from '@angular/core/testing';

import { OwnersService } from './owners-service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

describe('OwnersService', () => {
  let service: OwnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OwnersService,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(OwnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
