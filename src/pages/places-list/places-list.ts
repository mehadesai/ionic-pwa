import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Place } from '../../models/place/place.interface';
import firebase  from 'firebase';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public af:AngularFireDatabase) {
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



}
