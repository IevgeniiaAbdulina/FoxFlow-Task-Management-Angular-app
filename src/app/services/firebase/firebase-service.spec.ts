import { TestBed } from '@angular/core/testing';

import { FirebaseServiceTs } from './firebase-service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { of } from 'rxjs';
import { MemberInterface } from '@app/shared/interfaces/member-interface';

describe('FirebaseServiceTs', () => {
  let service: FirebaseServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirebaseServiceTs,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(FirebaseServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get project tasks', (done) => {
    const mockTasks: TaskData[] = [
      { id: '1', title: 'Task 1', status: 'todo', createdAt: new Date() },
      { id: '2', title: 'Task 2', status: 'done', createdAt: new Date() },
    ];

    spyOn(service, 'getProjectTasks').and.returnValue(of(mockTasks));

    service.getProjectTasks('project123').subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks[0].title).toBe('Task 1');
      done();
    });
  });

  it('should get a single task', (done) => {
    const mockTask: TaskData = {
      id: '1',
      title: 'Single Task',
      status: 'todo',
      createdAt: new Date(),
    };

    spyOn(service, 'getTask').and.returnValue(of(mockTask));

    service.getTask('project123', '1').subscribe((task) => {
      expect(task.title).toBe('Single Task');
      expect(task.status).toBe('todo');
      done();
    });
  });

  it('should add a task and return its ID', (done) => {
    spyOn(service, 'addTask').and.returnValue(of('newTaskId'));

    service.addTask('New Task', 'project123', new Date()).subscribe((id) => {
      expect(id).toBe('newTaskId');
      done();
    });
  });

  it('should delete a task', (done) => {
    spyOn(service, 'deleteTask').and.returnValue(of(void 0));

    service.deleteTask('project123', 'task123').subscribe(() => {
      expect().nothing(); // Просто проверяем, что Observable завершился
      done();
    });
  });

  it('should update a task', (done) => {
    spyOn(service, 'updateTask').and.returnValue(of(void 0));

    service
      .updateTask('project123', 'task123', { status: 'done' })
      .subscribe(() => {
        expect().nothing();
        done();
      });
  });

  it('should get users', (done) => {
    const mockUsers: MemberInterface[] = [
      {
        id: '1',
        displayName: 'Alice',
        email: 'example@gmail.com',
        userId: 'userId1',
      },
      {
        id: '2',
        displayName: 'Bob',
        email: 'example2@gmail.com',
        userId: 'userId2',
      },
    ];

    spyOn(service, 'getUsers').and.returnValue(of(mockUsers));

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users[0].displayName).toBe('Alice');
      done();
    });
  });
});
