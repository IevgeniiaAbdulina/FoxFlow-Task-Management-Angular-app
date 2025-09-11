import { TestBed } from '@angular/core/testing';

import { FirebaseServiceTs } from './firebase-service';

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
