import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICollection } from '../interfaces/icollection';
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  DocumentReference, 
  DocumentData,
  query,
  onSnapshot,
  where,
  getDocs
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService{
  
  constructor(private _firestore: Firestore) {}

  addOne(collectionName: string, document: ICollection) {
    return new Promise<DocumentReference<DocumentData>>((resolve) => {
      let collectionRef = collection(this._firestore, collectionName);
      let docRef: DocumentReference<DocumentData>;

      if (
        document.id == '' ||
        document.id == undefined ||
        document.id == null
      ) {
        docRef = doc(collectionRef);
        document.id = docRef.id;
      } else {
        docRef = doc(collectionRef, document.id);
      }
      setDoc(docRef, { ...document });
      resolve(docRef);
    });
  }

  getOne(collectionName: string, uuid: string) {
    let collectionRef = collection(this._firestore, collectionName);
    const document = query(collectionRef, where('uuid', '==', uuid));

    return getDocs(document);
  }

  getAllSnapshot<T = ICollection>(collectionName: string): Observable<T[]> {
    let docs = query(collection(this._firestore, collectionName));
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(docs, (querySnapshot) => {
        const collection: T[] = [];

        querySnapshot.forEach((doc) => {
          const simpleDoc = { ...(doc.data() as T) };
          collection.push(simpleDoc);
        });

        subscriber.next(collection);
      });
    });
  }

  getAllWhereSnapshot2<T = ICollection>(
    collectionName: string,
    actor: any,
  ): Observable<T[]> {
    const docs = query(
      collection(this._firestore, collectionName),
      where('mainCharacter', '==', actor),
    );

    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(docs, (querySnapshot) => {
        const collection: T[] = [];

        querySnapshot.forEach((doc) => {
          console.log('Documento encontrado:', doc.data()); // Log para depurar
          const simpleDoc = { ...(doc.data() as T) };
          collection.push(simpleDoc);
        });
        console.log('Colección de documentos:', collection); // Verificar la colección
        subscriber.next(collection);
      });

      // Cleanup the listener when unsubscribed
      return () => unsubscribe();
    });
  }

  /*uploadFile(file: File): Observable<string> {
    return new Observable((observer) => {
      const filePath = movies/${file.name};
      const storageRef = ref(this.storage, filePath);

      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          observer.next(downloadURL); // Emitir la URL del archivo
          observer.complete(); // Completar el observable
        });
      }).catch((error) => {
        observer.error(error); // Emitir error si ocurre
      });
    });
  }*/

  /* Segun chatgpt
  getAllSnapshot<T = any>(collectionName: string): Observable<T[]> {
    // Creamos una consulta para la colección
    let docs = query(collection(this._firestore, collectionName));

    // Retornamos un observable que emitirá los documentos en tiempo real
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(docs, (querySnapshot) => {
        const collection: T[] = [];

        querySnapshot.forEach((doc) => {
          const simpleDoc = { ...(doc.data() as T) };
          collection.push(simpleDoc); // Añadimos cada documento a la colección
        });

        subscriber.next(collection); // Emitimos la colección completa
      });

      // Cleanup cuando el observable se completa o se desuscribe
      return () => unsubscribe();
    });
  } */
}
