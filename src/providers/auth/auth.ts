import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  HAS_LOGGED_IN = 'hasLoggedIn';
  constructor(public afAuth: AngularFireAuth, public storage: Storage) {
  }

  loginUser(newEmail:string,newPassword:string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail,newPassword);
  }

  logoutUser(): Promise<void> {
    this.logoutUpdateStorage();
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

  setUserEmail(email) {
    this.storage.set('useremail', email);
  }

  getUserEmail(){
    return this.storage.get('useremail').then((value)=>{
      return value;
    });
  }

  setUserPhone(phone) {
    this.storage.set('userphone', phone);
  }

  getUserPhone(){
    return this.storage.get('userphone').then((value)=>{
      return value;
    });
  }

  loginWithEmail(email) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUserEmail(email);
  }

  loginWithPhone(email) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUserEmail(email);
  }

  logoutUpdateStorage() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('useremail');
    this.storage.remove('userphone');
  }

}
