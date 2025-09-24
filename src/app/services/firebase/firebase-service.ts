import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
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
  private usersCollection = collection(this.firestore, 'users');

  getProjectTasks(projectId: string): Observable<TaskData[]> {
    const collectionURL = `projects/${projectId}`;
    const projectDocRef = doc(this.firestore, collectionURL);
    const taskCollectionRef = collection(projectDocRef, 'tasks');
    const tasksSortedByDate = query(taskCollectionRef, orderBy('createdAt'));
    return collectionData(tasksSortedByDate, { idField: 'id' }) as Observable<
      TaskData[]
    >;
  }

  getTask(projectId: string, taskId: string): Observable<TaskData> {
    const collectionURL = `projects/${projectId}/tasks/${taskId}`;
    const taskDocRef = doc(this.firestore, collectionURL);
    return docData(taskDocRef, { idField: 'id' }) as Observable<TaskData>;
  }

  addTask(text: string, projectId: string, date: Date): Observable<string> {
    const collectionURL = `projects/${projectId}`;
    const projectDocRef = doc(this.firestore, collectionURL);
    const taskCollectionRef = collection(projectDocRef, 'tasks');
    const todoToCreate = {
      title: text,
      status: 'todo',
      createdAt: date,
    };

    const promise = addDoc(taskCollectionRef, todoToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  deleteTask(projectId: string, taskId: string): Observable<void> {
    const collectionURL = `projects/${projectId}/tasks/${taskId}`;
    const docRef = doc(this.firestore, collectionURL);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateTask(
    projectId: string,
    taskId: string,
    updateFields: Partial<TaskData>
  ): Observable<void> {
    const collectionURL = `projects/${projectId}/tasks/${taskId}`;
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
