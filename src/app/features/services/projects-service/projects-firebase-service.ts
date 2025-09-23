import { inject, Injectable, Signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  updateDoc,
  limit,
  getDoc,
} from '@angular/fire/firestore';
import { EMPTY, from, Observable } from 'rxjs';
import { Project } from '@app/shared/interfaces/project-interface';
import { AuthService } from '@app/auth/services/auth-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserInterface } from '@app/shared/interfaces/user-interface';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { NotificationService } from '@app/shared/services/notification-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFirebaseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private firebaseServiceTs = inject(FirebaseServiceTs);
  private notificationService = inject(NotificationService);

  projectsCollection = collection(this.firestore, 'projects');
  projectsSortedByDate = query(
    this.projectsCollection,
    orderBy('createdAt', 'desc'),
    limit(12)
  );

  private readonly projectOwner = toSignal(this.authService.user$, {
    initialValue: null,
  }) as Signal<UserInterface>;

  getProjects(): Observable<Project[]> {
    return collectionData(this.projectsSortedByDate, {
      idField: 'id',
    }) as Observable<Project[]>;
  }

  addProject(text: string): Observable<string> {
    const projectToCreate = {
      title: text,
      owner: this.projectOwner().uid,
      createdAt: new Date().toISOString(),
    };

    const promise = addDoc(this.projectsCollection, projectToCreate).then(
      (result) => {
        this.addTasksCollection(result.id);
        return result.id;
      }
    );
    return from(promise);
  }

  addTasksCollection(projectId: string): void {
    const date = new Date();
    const todoToCreate = '[EXAMPLE TASK] Learn Routing';

    this.firebaseServiceTs
      .addTask(todoToCreate, projectId, date)
      .subscribe((result) => console.log('Added default first task.', result));
  }

  removeProject(projectID: string): Observable<void> {
    const docRef = doc(this.firestore, 'projects/' + projectID);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateProject(
    projectID: string,
    dataToUpdate: { title: string }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'projects/' + projectID);
    const promise = updateDoc(docRef, dataToUpdate);
    return from(promise);
  }

  getProject(projectId: string): Observable<Project> {
    const path = 'projects/' + projectId;
    const docRef = doc(this.firestore, path);
    const promise = getDoc(docRef)
      .then((result) => {
        const res = result.data();
        console.log('Get current Project by id:', projectId, res);
        return result.data();
      })
      .catch(() => {
        const message = 'No such project!';
        this.notificationService.showErrorMessage(message);
        return EMPTY;
      });
    return from(promise) as Observable<Project>;
  }
}
