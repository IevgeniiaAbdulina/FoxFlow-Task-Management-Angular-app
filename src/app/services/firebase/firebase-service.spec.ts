import { TestBed } from '@angular/core/testing';

import { FirebaseServiceTs } from './firebase-service.ts';

describe('FirebaseServiceTs', () => {
  let service: FirebaseServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
