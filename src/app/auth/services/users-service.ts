import { inject, Injectable } from '@angular/core';
import { from, map, Observable, take } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { MemberInterface } from '@app/shared/interfaces/member-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);

  usersCollection = collection(this.firestore, 'users');

  getUsers(): Observable<MemberInterface[]> {
    return collectionData(this.usersCollection, {
      idField: 'id',
    }) as Observable<MemberInterface[]>;
  }

  addUser(member: MemberInterface): Observable<string> {
    const promise = addDoc(this.usersCollection, member).then((result) => {
      const docRef = doc(this.firestore, 'users', result.id);
      updateDoc(docRef, { userId: result.id });

      return result.id;
    });
    return from(promise);
  }

  isUserExist(userEmail: string): Observable<boolean> {
    /* Nice to use `query` with `where` */
    return this.getUsers().pipe(
      take(1),
      map((users: MemberInterface[]) => {
        return users.filter((user) => user.email === userEmail).length > 0;
      })
    );
  }
}
