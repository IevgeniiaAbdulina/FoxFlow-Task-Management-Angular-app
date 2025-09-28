import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetail } from './task-detail';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { TaskStatus } from '@app/shared/interfaces/task-interface';

describe('TaskDetail', () => {
  let component: TaskDetail;
  let fixture: ComponentFixture<TaskDetail>;

  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;

  const mockTask = {
    id: 'taskId',
    title: 'test',
    dueTo: new Timestamp(Math.floor(Date.now() / 1000), 0).toDate(),
    description: 'Test Description',
    status: 'todo' as TaskStatus,
    assignedTo: [
      {
        id: 'user1',
        userId: 'user1',
        email: 'post@gmail.com',
        displayName: 'User One',
        photoURL: 'assets/mock-image.png',
      },
    ],
    createdAt: new Date(),
  };

  const mockUsers = [
    {
      id: 'user1',
      userId: 'user1',
      email: 'post@gmail.com',
      displayName: 'User One',
      photoURL: 'assets/mock-image.png',
    },
    {
      id: 'user2',
      userId: 'user2',
      email: 'post2@gmail.com',
      displayName: 'User Two',
      photoURL: 'assets/mock-image1.png',
    },
  ];

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', [
      'currentProject',
    ]);
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', [
      'getUsers',
      'getTask',
    ]);

    mockProjectService.currentProject.and.returnValue({
      id: 'projectId',
      title: '',
      owner: '',
      createdAt: '',
    });
    mockFirebaseService.getTask.and.returnValue(of(mockTask));
    mockFirebaseService.getUsers.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [TaskDetail, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: ProjectService, useValue: mockProjectService },
        { provide: FirebaseServiceTs, useValue: mockFirebaseService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
