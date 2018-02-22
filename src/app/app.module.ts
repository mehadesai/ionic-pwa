import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';

// Importing AF2 Module

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { RemoteServicePlacesProvider } from '../providers/remote-service-places/remote-service-places';
import { CommonFunctionsProvider } from '../providers/common-functions/common-functions';

// AF2 Settings
const firebaseConfig = {
    apiKey: "AIzaSyBd_ADAhTC8IsxHmgiJJgysuh1E-YkqHJw",
    authDomain: "testproject-babea.firebaseapp.com",
    databaseURL: "https://testproject-babea.firebaseio.com",
    storageBucket: "testproject-babea.appspot.com",
    messagingSenderId: "265124419224"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    RemoteServicePlacesProvider,
    CommonFunctionsProvider,
  ]
})
export class AppModule {}
