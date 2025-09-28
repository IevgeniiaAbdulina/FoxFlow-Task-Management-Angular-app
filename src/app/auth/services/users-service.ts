import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  updateDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { MemberInterface } from '@app/shared/interfaces/member-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);

  usersCollection = collection(this.firestore, 'users');

  addUser(member: MemberInterface): Observable<string> {
    const promise = addDoc(this.usersCollection, member).then((result) => {
      const docRef = doc(this.firestore, 'users', result.id);
      updateDoc(docRef, { userId: result.id });

      return result.id;
    });
    return from(promise);
  }

  isUserExist(userEmail: string): Observable<boolean> {
    const q = query(this.usersCollection, where('email', '==', userEmail));

    return collectionData(q, { idField: 'id' }).pipe(
      map((users) => {
        return users.length > 0;
      })
    );
  }

  findProjectOwner(userId: string): Observable<MemberInterface> {
    const q = query(this.usersCollection, where('id', '==', userId));

    return collectionData(q, { idField: 'id' }).pipe(
      map((users) => {
        return users[0];
      })
    ) as Observable<MemberInterface>;
  }
}
