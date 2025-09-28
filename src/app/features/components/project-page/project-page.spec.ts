import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPage } from './project-page';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/auth/services/auth-service';

describe('ProjectPage', () => {
  let component: ProjectPage;
  let fixture: ComponentFixture<ProjectPage>;

  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', ['']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['currentUser']);
    mockProjectService = jasmine.createSpyObj('ProjectService', [
      'currentProject',
      'currentProjectOwner',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProjectPage, TranslateModule.forRoot()],
      providers: [
        provideRouter(routes),
        TranslateService,
        { provide: ProjectService, useValue: mockProjectService },
        { provide: FirebaseServiceTs, useValue: mockFirebaseService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
