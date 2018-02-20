import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {
  }

  loginUser(newEmail:string,newPassword:string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail,newPassword);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail:string,newPassword:string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail,newPassword);
  }

  resetPassword(email:string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  loginFacebook(): Promise<any> {
    // login with facebook code goes here  .....
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }



}
