import { TestBed } from '@angular/core/testing';

import { ProjectsFirebaseService } from './projects-firebase-service';

describe('ProjectsFirebaseService', () => {
  let service: ProjectsFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
