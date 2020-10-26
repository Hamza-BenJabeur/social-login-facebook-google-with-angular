import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {}

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  FecebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(
          'result from login===> ',
          result.additionalUserInfo.profile
        );
        localStorage.setItem('user', 'true');
        result && this.router.navigate(['']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', 'false');
      this.router.navigate(['login']);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user from storage==> ', user);

    return user ? true : false;
  }
}
