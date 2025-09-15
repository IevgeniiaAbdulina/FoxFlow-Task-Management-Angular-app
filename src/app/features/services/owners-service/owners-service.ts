import { inject, Injectable } from '@angular/core';
import { OwnerData } from '@app/shared/interfaces/owner-interface';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  private firestore = inject(Firestore);
  private membersCollection = collection(this.firestore, 'teammates');

  getOwners(): Observable<OwnerData[]> {
    return collectionData(this.membersCollection, {
      idField: 'id',
    }) as Observable<OwnerData[]>;
  }
}
