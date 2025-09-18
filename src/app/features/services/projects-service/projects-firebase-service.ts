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
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Project } from '@app/shared/interfaces/project-interface';
import { AuthService } from '@app/auth/services/auth-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserInterface } from '@app/shared/interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFirebaseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

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
      (result) => result.id
    );
    return from(promise);
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
}
