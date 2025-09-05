import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
//import { collection, CollectionReference, DocumentData, getDocs } from 'firebase/firestore';
import {
  Firestore,
  collection,
  CollectionReference,
  DocumentData,
  getDocs,
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
