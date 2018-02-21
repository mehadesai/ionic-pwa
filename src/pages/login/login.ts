import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm:FormGroup;
  loading:Loading;
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authData:AuthProvider,public formBuilder:FormBuilder,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
    this.loginForm=formBuilder.group({
      email:['',Validators.compose([Validators.required,EmailValidator.isValid])],
      password:['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });
  }

  loginUser(){
    let self=this;
    if(!this.loginForm.valid){
      console.log(this.loginForm.value);
    }
    else{
      this.authData.loginUser(this.loginForm.value.email,this.loginForm.value.password).then(authData=>{
        console.log("email="+self.authData.afAuth.auth.currentUser.email);
        console.log("displayName="+self.authData.afAuth.auth.currentUser.displayName);
        console.log("providerId="+self.authData.afAuth.auth.currentUser.providerId);
        console.log(authData);
        self.email=self.authData.afAuth.auth.currentUser.email;
        this.authData.loginWithEmail(self.email);
        this.navCtrl.setRoot(HomePage);
      },error=>{
        this.loading.dismiss().then(()=>{
          let alert=this.alertCtrl.create({
            message:error.message,
            buttons:[{
              text:"Ok",
              role:'cancel'
            }
              
            ]
          });
          alert.present();
        });
      });
      this.loading=this.loadingCtrl.create({
        dismissOnPageChange:true
      });
      this.loading.present();
    }
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(){
    this.navCtrl.push("ResetPasswordPage");
  }

  loginFacebook(){
    // login with facebook code goes here  .....
    this.authData.loginFacebook().then((res)=>console.log(res));
  }

  loginPhone(){
    this.navCtrl.push("PhoneLoginPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
