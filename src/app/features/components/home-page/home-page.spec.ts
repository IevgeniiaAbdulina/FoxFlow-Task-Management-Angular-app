import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { UsersService } from '@app/auth/services/users-service';
import { ProjectsFirebaseService } from '@app/features/services/projects-service/projects-firebase-service';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let mockUserService: jasmine.SpyObj<UsersService>;
  let mockProjecFirebaseService: jasmine.SpyObj<ProjectsFirebaseService>;

  beforeEach(async () => {
    const mockAuth = jasmine.createSpyObj('Auth', [
      'signInWithEmailAndPassword',
      'signOut',
    ]);
    mockProjecFirebaseService = jasmine.createSpyObj(
      'ProjectsFirebaseService',
      ['getProjects']
    );
    mockProjecFirebaseService.getProjects.and.returnValue(of([]));

    mockUserService = jasmine.createSpyObj('UsersService', ['']);

    await TestBed.configureTestingModule({
      imports: [HomePage, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: Auth, useValue: mockAuth },
        {
          provide: ProjectsFirebaseService,
          useValue: mockProjecFirebaseService,
        },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
