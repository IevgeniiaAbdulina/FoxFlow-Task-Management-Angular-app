import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListItem } from './task-list-item';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjectService } from '@app/features/services/projects-service/project-service';
//import { Timestamp } from 'firebase/firestore';
//import { TaskStatus } from '@app/shared/interfaces/task-interface';

describe('TaskListItem', () => {
  let component: TaskListItem;
  let fixture: ComponentFixture<TaskListItem>;

  let mockProjectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', [
      'currentProject',
    ]);

    await TestBed.configureTestingModule({
      imports: [TaskListItem, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: ProjectService, useValue: mockProjectService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListItem);

    /* fixture.setInput('task', {
      id: 'taskId',
      title: 'test',
      dueTo: new Timestamp(Math.floor(Date.now() / 1000), 0),
      description: 'Test Description',
      status: 'todo' as TaskStatus,
      assignedTo: [{
        id: 'user1',
        userId: 'user1',
        email: 'post@gmail.com',
        displayName: 'User One',
        photoURL: 'assets/mock-image.png'
      }],
      createdAt: new Date()
    }); */
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
