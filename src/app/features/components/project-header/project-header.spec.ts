import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHeader } from './project-header';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { AuthService } from '@app/auth/services/auth-service';

describe('ProjectHeader', () => {
  let component: ProjectHeader;
  let fixture: ComponentFixture<ProjectHeader>;

  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', [
      'currentProject',
      'currentProjectOwner',
    ]);
    mockAuthService = jasmine.createSpyObj('AuthService', ['currentUser']);

    await TestBed.configureTestingModule({
      imports: [ProjectHeader],
      providers: [
        provideRouter(routes),
        { provide: ProjectService, useValue: mockProjectService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start editing with project title', () => {
    component.startEditing();
    expect(component.isEditing()).toBeTrue();
    expect(component.editingText()).toBe('');
  });

  it('should cancel editing and reset editingText', () => {
    component.editingText.set('Some text');
    component.cancelEditing();
    expect(component.isEditing()).toBeFalse();
    expect(component.editingText()).toBe('');
  });

  it('should compute isOwner correctly', () => {
    expect(component.isOwner()).toBeTrue();
  });
});
