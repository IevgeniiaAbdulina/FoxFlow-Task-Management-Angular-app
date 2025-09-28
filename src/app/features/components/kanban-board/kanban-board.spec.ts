import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoard } from './kanban-board';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { ProjectService } from '@app/features/services/projects-service/project-service';

describe('KanbanBoard', () => {
  let component: KanbanBoard;
  let fixture: ComponentFixture<KanbanBoard>;

  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', ['']);
    mockProjectService = jasmine.createSpyObj('ProjectService', [
      'currentProject',
    ]);

    await TestBed.configureTestingModule({
      imports: [KanbanBoard, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        provideRouter(routes),
        { provide: FirebaseServiceTs, useValue: mockFirebaseService },
        { provide: ProjectService, useValue: mockProjectService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
