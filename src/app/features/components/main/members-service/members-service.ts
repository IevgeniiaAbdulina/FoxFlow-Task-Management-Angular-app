import { inject, Injectable } from '@angular/core';
import { MemberData } from '@app/shared/interfaces/member-interface';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private firestore = inject(Firestore);
  private membersCollection = collection(this.firestore, 'teammates');

  getMembers(): Observable<MemberData[]> {
    return collectionData(this.membersCollection, {
      idField: 'id',
    }) as Observable<MemberData[]>;
  }
}
