import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHeader } from './project-header';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';

describe('ProjectHeader', () => {
  let component: ProjectHeader;
  let fixture: ComponentFixture<ProjectHeader>;

  let mockProjectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', [
      'currentProject',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProjectHeader],
      providers: [
        provideRouter(routes),
        { provide: ProjectService, useValue: mockProjectService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
