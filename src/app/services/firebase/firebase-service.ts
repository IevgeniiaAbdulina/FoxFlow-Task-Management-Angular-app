import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  DocumentData,
  collectionData,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  docData,
} from '@angular/fire/firestore';
import { MemberInterface } from '@app/shared/interfaces/member-interface';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceTs {
  private firestore = inject(Firestore);
  private testCollection = collection(this.firestore, 'foxflowtest');
  private usersCollection = collection(this.firestore, 'users');

  //private projectId$ = new BehaviorSubject<string | null>(null);
  //private taskId$ = new BehaviorSubject<string | null>(null);

  /* setProjectId(projectid: string): void {
    this.projectId$.next(projectid);
  } */

  getTestConnection(): Observable<DocumentData[]> {
    return collectionData(this.testCollection, {
      idField: 'id',
    });
  }

  getProjectTasks(projectId: string): Observable<TaskData[]> {
    const collectionURL = `projects/${projectId}`;
    const projectDocRef = doc(this.firestore, collectionURL);
    const taskCollectionRef = collection(projectDocRef, 'task-project1');
    const tasksSortedByDate = query(taskCollectionRef, orderBy('createdAt'));
    return collectionData(tasksSortedByDate, { idField: 'id' }) as Observable<
      TaskData[]
    >;
  }

  getTask(projectId: string, taskId: string): Observable<TaskData> {
    const collectionURL = `projects/${projectId}/task-project1/${taskId}`;
    const tascDocRef = doc(this.firestore, collectionURL);
    return docData(tascDocRef, { idField: 'id' }) as Observable<TaskData>;
  }

  addTask(text: string, projectId: string, date: Date): Observable<string> {
    const collectionURL = `projects/${projectId}`;
    const projectDocRef = doc(this.firestore, collectionURL);
    const taskCollectionRef = collection(projectDocRef, 'task-project1');
    const todoToCreate = { title: text, status: 'todo', createdAt: date };

    const promise = addDoc(taskCollectionRef, todoToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  deleteTask(projectId: string, taskId: string): Observable<void> {
    const collectionURL = `projects/${projectId}/task-project1/${taskId}`;
    const docRef = doc(this.firestore, collectionURL);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateTask(
    projectId: string,
    taskId: string,
    updateFields: Partial<TaskData>
  ): Observable<void> {
    const collectionURL = `projects/${projectId}/task-project1/${taskId}`;
    const docRef = doc(this.firestore, collectionURL);
    const promise = updateDoc(docRef, updateFields);
    return from(promise);
  }

  getUsers(): Observable<MemberInterface[]> {
    return collectionData(this.usersCollection, {
      idField: 'id',
    }) as Observable<MemberInterface[]>;
  }
}
