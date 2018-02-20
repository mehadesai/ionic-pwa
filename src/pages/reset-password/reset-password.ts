import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  resetPasswordForm:FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public authData:AuthProvider,public alertCtrl:AlertController) {
    this.resetPasswordForm=formBuilder.group({
      email:['',Validators.compose([Validators.required,EmailValidator.isValid])]
    });
  }

  resetPassword(){
    if(!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    }
    else{
      this.authData.resetPassword(this.resetPasswordForm.value.email).then((user)=>{
        let alert=this.alertCtrl.create({
          message:'We just sent you a reset link to your email',
          buttons:[{
            text:'Ok',
            role:'cancel',
            handler:()=>{
              this.navCtrl.pop();
            }
          }]
        });
        alert.present();
      },error=>{
        var errorMessage=error.message
        let alert=this.alertCtrl.create({
          message:errorMessage,
          buttons:[{
            text:'Ok',
            role:'cancel'
          }]
          
        });
        alert.present();
        
      });
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
