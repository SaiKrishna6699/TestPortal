// login.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, switchMap, map, catchError } from 'rxjs/operators';
import { UserServiceService } from '../user/user-service.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  isLoggedIn: boolean = false;
  user: any;

  private dataCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore, private userService: UserServiceService) {
    this.dataCollection = this.firestore.collection('users');
    this.initializeLoginStatus();
  }

  private initializeLoginStatus() {
    const userData = this.userService.getUser();
    this.user = userData;
    this.isLoggedIn = userData !== null;
    this.isLoggedInSubject.next(this.isLoggedIn);
  }

  setUserOrAdmin(details: any) {
    if (details.admin_username) {
      this.userService.setAdmin(details);
      sessionStorage.setItem('adminDetails', JSON.stringify({ username: details.admin_username, name: details.name }));
    } else {
      this.userService.setUser(details);
      sessionStorage.setItem('userDetails', JSON.stringify({ email: details.email, name: details.name, mobileNumber: details.mobileNumber }));
    }
    this.isLoggedIn = true;
    this.isLoggedInSubject.next(true);
  }

  register(formData: any): Observable<any> {
    return from(this.dataCollection.add(formData));
  }

  adminLogin(username: string, password: string): Observable<boolean> {
    const adminCollection: AngularFirestoreCollection<any> = this.firestore.collection('admin', ref => ref.where('admin_username', '==', username));

    return adminCollection.valueChanges().pipe(
      map(admin => {
        if (admin.length === 1 && admin[0].password === password) {
          this.setUserOrAdmin(admin[0]);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  validateUser(email: string, password: string): Observable<boolean> {
    const userCollection: AngularFirestoreCollection<any> = this.firestore.collection('users', ref =>
      ref.where('email', '==', email)
    );

    return userCollection.valueChanges().pipe(
      map(users => {
        if (users.length === 1 && users[0].password === password) {
          this.setUserOrAdmin(users[0]);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  getUserDetailsFromSessionStorage() {
    const userDetails = sessionStorage.getItem('userDetails');
    return userDetails ? JSON.parse(userDetails) : null;
  }

  getAdminDetailsFromSessionStorage() {
    const adminDetails = sessionStorage.getItem('adminDetails');
    return adminDetails ? JSON.parse(adminDetails) : null;
  }

  logoutUser(): void {
    this.isLoggedIn = false;
    this.isLoggedInSubject.next(false);
    sessionStorage.removeItem('userDetails');
    sessionStorage.removeItem('adminDetails');
  }

  resetPassword(email: string, newPassword: string, newConfirmPassword: string): Observable<boolean> {
    const userCollection: AngularFirestoreCollection<any> = this.firestore.collection('users', ref =>
      ref.where('email', '==', email)
    );

    if (newPassword !== newConfirmPassword) {
      return of(false);
    }

    return userCollection.snapshotChanges().pipe(
      take(1),
      switchMap(actions => {
        if (actions.length === 1) {
          const userDoc = userCollection.doc(actions[0].payload.doc.id);
          return from(userDoc.update({ password: newPassword, confirmPassword: newConfirmPassword })).pipe(
            map(() => true),
            catchError(() => of(false))
          );
        }
        return of(false);
      })
    );
  }
}
