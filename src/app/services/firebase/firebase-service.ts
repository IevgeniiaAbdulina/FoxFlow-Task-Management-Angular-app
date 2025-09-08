import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  DocumentData,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
}
