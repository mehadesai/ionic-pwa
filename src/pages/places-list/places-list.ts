import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Place } from '../../models/place/place.interface';
import firebase  from 'firebase';
import { HomePage } from '../home/home';
/**
 * Generated class for the PlacesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places-list',
  templateUrl: 'places-list.html',
})
export class PlacesListPage {
  // items$:AngularFireList<Place[]>;
  // places:any;
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('places');
  descending: boolean = false;
  order: number;
  column: string = 'description';
  constructor(public navCtrl: NavController, public navParams: NavParams,public af:AngularFireDatabase, public actionSheetCtrl:ActionSheetController) {
    // this.items$=this.af.list('places');
    // this.places=Array.of(this.items$);
    // console.log(this.items$)
  }

  ionViewDidLoad() {
    this.itemRef.on('value', itemSnapshot => {
      this.items = [];
      itemSnapshot.forEach( itemSnap => {
        this.items.push(itemSnap.val());
        return false;
      });
    });
    
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  presentFilterActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Places Filters',
      buttons: [
        {
          text: 'Nearby places',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  filterData(){
    this.presentFilterActionSheet();
  }

  navigateToNearbyPlaces(place_id) {
    this.navCtrl.push(HomePage, {
      nearbyplaces: true,
      place_id: place_id
    })
  }



}
