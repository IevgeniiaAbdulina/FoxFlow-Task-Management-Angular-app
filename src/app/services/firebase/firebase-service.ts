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
import { TaskData } from '@app/shared/interfaces/task-interface';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceTs {
  private firestore = inject(Firestore);
  private testCollection = collection(this.firestore, 'foxflowtest');

  getTestConnection(): Observable<DocumentData[]> {
    return collectionData(this.testCollection, {
      idField: 'id',
    });
  }

  getProjectTasks(projectId: string): Observable<TaskData[]> {
    const projectDocRef = doc(this.firestore, `projects/${projectId}`);
    const taskCollectionRef = collection(projectDocRef, 'task-project1');
    const tasksSortedByDate = query(taskCollectionRef, orderBy('createdAt'));
    return collectionData(tasksSortedByDate, { idField: 'id' }) as Observable<
      TaskData[]
    >;
  }

  getTask(projectId: string, taskId: string): Observable<TaskData> {
    const tascDocRef = doc(
      this.firestore,
      `projects/${projectId}/task-project1/${taskId}`
    );
    return docData(tascDocRef, { idField: 'id' }) as Observable<TaskData>;
  }

  addTask(text: string, projectId: string, date: Date): Observable<string> {
    const projectDocRef = doc(this.firestore, `projects/${projectId}`);
    const taskCollectionRef = collection(projectDocRef, 'task-project1');
    const todoToCreate = { title: text, isCompleted: false, createdAt: date };

    const promise = addDoc(taskCollectionRef, todoToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  deleteTask(projectId: string, taskId: string): Observable<void> {
    const docRef = doc(
      this.firestore,
      `projects/${projectId}/task-project1/${taskId}`
    );
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateTask(
    projectId: string,
    taskId: string,
    updateFields: Partial<TaskData>
  ): Observable<void> {
    const docRef = doc(
      this.firestore,
      `projects/${projectId}/task-project1/${taskId}`
    );
    const promise = updateDoc(docRef, updateFields);
    return from(promise);
  }
}
