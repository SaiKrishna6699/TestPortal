import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private dataCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore,) {
    this.dataCollection = this.firestore.collection('results');
  }

  saveResults(formData: any) {
    return this.firestore.collection('results').add({
      username: formData.username,
      email: formData.email,
      points: formData.points,
      correctAnswers: formData.correctAnswers,
      wrongAnswers: formData.wrongAnswers,
      questionAttempted: formData.questionAttempted,
      results: formData.results,
      time: formData.time
    });
  }

  getUserResults(email: string): Observable<any[]> {
    const resultsCollection: AngularFirestoreCollection<any> = this.firestore.collection('results', ref =>
      ref.where('email', '==', email)
    );

    return resultsCollection.valueChanges();
  }

  deleteResult(email: string, time: string): Observable<any> {
    const resultsCollection: AngularFirestoreCollection<any> = this.firestore.collection('results', ref =>
      ref.where('email', '==', email).where('time', '==', time)
    );

    return resultsCollection.get().pipe(
      switchMap(querySnapshot => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]; // Assuming there's only one document
          return from(doc.ref.delete());
        } else {
          console.log('No matching document found for deletion.');
          return of(null); // Return an observable to handle the case where no document is found
        }
      }),
      catchError(error => {
        console.error('Error deleting document: ', error);
        return of(null); // Return an observable to handle errors
      }));
  }

  getAllResults(): Observable<any[]> {
    const usersCollection: AngularFirestoreCollection<any> = this.firestore.collection('results');

    return usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }



  getAllUsers(): Observable<any[]> {
    const usersCollection: AngularFirestoreCollection<any> = this.firestore.collection('users');

    return usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // updateUserbyEmail(email: string, formData: any):Observable<any> {
  //   const userData = this.firestore.collection('users', ref =>
  //     ref.where('email', '==', email));

  //   const dataToUpdate = {
  //     name: formData.name,
  //     password: formData.password,
  //     confirmPassword: formData.confirmPassword,
  //     email: formData.email,
  //     gender: formData.gender,
  //     mobileNumber: formData.mobileNumber,
  //     termsAndConditions: 'true'
  //   }

  //   console.log('email', email);

  //   console.log("update method formdata", formData);

  //   userData.get().subscribe((querySnapshot) => {
  //     if (!querySnapshot.empty) {
  //       querySnapshot.forEach((doc) => {
  //         doc.ref.update(dataToUpdate)
  //           .then(() => {
  //             console.log('Document successfully updated!');
  //           })
  //           .catch((error) => {
  //             console.error('Error updating document: ', error);
  //           });
  //       });
  //     } else {
  //       console.log('No matching document found.');
  //     }
  //   });

  // }

  updateUserbyEmail(email: string, formData: any): Observable<any> {
    const userData = this.firestore.collection('users', ref =>
      ref.where('email', '==', email));

    const dataToUpdate = {
      name: formData.name,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      email: formData.email,
      gender: formData.gender,
      mobileNumber: formData.mobileNumber,
      termsAndConditions: 'true'
    };

    console.log('email', email);
    console.log('update method formdata', formData);

    return userData.get().pipe(
      switchMap(querySnapshot => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          return from(doc.ref.update(dataToUpdate));
        } else {
          console.log('No matching document found.');
          return of(null);
        }
      }),
      catchError(error => {
        console.error('Error updating document: ', error);
        return of(null);
      })
    );
  }

  deleteByEmail(email: string): Observable<any> {
    const userData = this.firestore.collection('users', ref =>
      ref.where('email', '==', email));

    return userData.get().pipe(
      switchMap(querySnapshot => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          return from(doc.ref.delete());
        } else {
          console.log('No matching document found for deletion.');
          return of(null);
        }
      }),
      catchError(error => {
        console.error('Error deleting document: ', error);
        return of(null); // Return an observable to handle errors
      })
    );
  }

}
