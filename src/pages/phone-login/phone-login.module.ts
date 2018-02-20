import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneLoginPage } from './phone-login';

@NgModule({
  declarations: [
    PhoneLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneLoginPage),
  ],
})
export class PhoneLoginPageModule {}
