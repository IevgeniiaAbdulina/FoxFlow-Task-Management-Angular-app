import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHeader } from './task-header';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { of } from 'rxjs';
//import { Auth } from '@angular/fire/auth';
//import { provideFirestore, getFirestore } from '@angular/fire/firestore';
//import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('TaskHeader', () => {
  let component: TaskHeader;
  let fixture: ComponentFixture<TaskHeader>;
  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', [
      'currentProject',
    ]);
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', [
      'addTask',
    ]);
    //const mockAuth = jasmine.createSpyObj('Auth', ['signInWithEmailAndPassword', 'signOut']);

    await TestBed.configureTestingModule({
      imports: [TaskHeader, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        //provideFirebaseApp(() => initializeApp(environment.firebase)),
        //provideFirestore(() => getFirestore()),
        //{provide: Auth, useValue: mockAuth },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: FirebaseServiceTs, useValue: mockFirebaseService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud add task and reset text', () => {
    const mockProjectId = 'projectId';
    mockProjectService.currentProject.and.returnValue({
      id: mockProjectId,
      title: '',
      owner: '',
      createdAt: '',
    });
    mockFirebaseService.addTask.and.returnValue(of('mock-task-id'));

    component.text = 'test';
    component.addTask();

    expect(mockFirebaseService.addTask).toHaveBeenCalledOnceWith(
      'test',
      mockProjectId,
      jasmine.any(Date)
    );
    expect(component.text).toBe('');
  });
});
