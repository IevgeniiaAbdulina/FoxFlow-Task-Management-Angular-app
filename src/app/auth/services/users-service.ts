import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
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
      console.log('[Add Member] Firebase', result.id);
      this.updateUser(result.id);
      return result.id;
    });
    return from(promise);
  }

  updateUser(userId: string): Observable<void> {
    const docRef = doc(this.firestore, 'users/' + userId);
    const promise = updateDoc(docRef, { userId: userId });
    return from(promise);
  }
}
