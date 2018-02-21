import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import {} from '@types/googlemaps';

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
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController,public authData:AuthProvider,private zone: NgZone) {
    
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


    getAddress(place: Object) {       
      this.address = place['formatted_address'];
      var location = place['geometry']['location'];
      var lat =  location.lat();
      var lng = location.lng();
      console.log('Address Object', place);
  }

}
