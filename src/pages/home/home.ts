import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  useremail:string;
  userphone:number;
  constructor(public navCtrl: NavController,public authData:AuthProvider) {

  }

  logOut(){
    this.authData.logoutUser().then(authData=>{
      this.navCtrl.setRoot(LoginPage);
      //this.navCtrl.popAll();
      //this.navCtrl.push("LoginPage");
    });
  }

  getUserEmail(){
    this.authData.getUserEmail().then(useremail=>{
      this.useremail=useremail;
      console.log("useremail=="+useremail);
    })
  }

  getUserPhone(){
    this.authData.getUserPhone().then(userphone=>{
      this.userphone=userphone;
      console.log("userphone=="+userphone);
    })
  }

  ngAfterViewInit() {
    this.getUserEmail();
    this.getUserPhone();
  }

}
