import { Component, NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import {} from '@types/googlemaps';
import { AngularFireDatabase } from 'angularfire2/database';
import { CommonFunctionsProvider } from '../../providers/common-functions/common-functions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  useremail:string;
  userphone:number;
  autocomplete:any;
  autocompleteItems;
  address:string;
  latitude: number = 0;
  longitude: number = 0;
  geo: any;
  description:any;
  place_id:number;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController,public authData:AuthProvider,private zone: NgZone,public alertCtrl:AlertController,private af: AngularFireDatabase,public commonfunc:CommonFunctionsProvider) {
    
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
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

  ionViewLoaded() {
    let elem = <HTMLInputElement>document.getElementsByClassName('searchbar-input')[0];
    this.autocomplete = new google.maps.places.Autocomplete(elem);
  }

  updateSearchResults(){
    console.log(this.autocomplete.input)
    if(this.autocomplete.input == ''){
      this.autocompleteItems=[];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
    }


    selectSearchResult(item){
      // this.autocompleteItems=[];
      console.log(item);
      this.geo=item;
      this.geoCode(this.geo);
      // this.presentAddPlaceConfirm();
    }

    //convert Address string to lat and long
    geoCode(item:any) {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
        console.log(results)
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        this.place_id=item.place_id;
        this.description=results[0].formatted_address;
        console.log("desc=="+results[0].formatted_address)     
        this.presentAddPlaceConfirm();
      });
      return;
  }

  presentAddPlaceConfirm() {
    let self=this;
    let latitude=this.latitude;
    let longitude=this.longitude;
    let place_id=this.place_id;
    let description=this.description;
    console.log("latitude="+latitude+"=longitude="+longitude+"=place_id="+place_id+"=description="+description)
    let alert = this.alertCtrl.create({
      title: 'Confirm add place',
      message: 'Do you really want to add this place?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.af.list(`places`).push({ description,place_id,latitude,longitude });
            this.commonfunc.presentToast("Place added Successfully!!!");
            // alert.dismiss();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }


}
