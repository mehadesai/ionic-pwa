import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
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
  place_id:any;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  GooglePlaces=new google.maps.places.PlacesService(document.createElement('div'))
  nearbyItems:any;
  place_id_param:any;
  nearby_places_param:boolean = false;
  constructor(public navCtrl: NavController,public navParams: NavParams, public authData:AuthProvider,private zone: NgZone,public alertCtrl:AlertController,private af: AngularFireDatabase,public commonfunc:CommonFunctionsProvider) {
    
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.nearby_places_param = navParams.get("nearbyplaces");
    this.place_id_param = navParams.get("place_id");

    console.log("nearby_places_param=="+this.nearby_places_param+"=="+this.place_id_param);
    if(this.nearby_places_param == true){
      this.searchNearbyPlaces(this.place_id_param);
    }
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
            console.log(prediction);
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

  searchNearbyPlaces(place_id){
    console.log("Nearby placess====")
    this.autocompleteItems = [];
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'placeId': place_id}, (results, status) => {
      if(results[0]){
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
            location: results[0].geometry.location,
            radius: 500
          }, (near_places) => {
            this.zone.run(() => {
              this.nearbyItems = [];
              console.log(near_places)
              for (var i = 0; i < near_places.length; i++) {
                near_places[i]["description"]=near_places[i].name;
                this.nearbyItems.push(near_places[i]);
                this.autocompleteItems.push(near_places[i]);
                
              }
          });
        });
      }
    });
    console.log(this.nearbyItems);
  }
}
