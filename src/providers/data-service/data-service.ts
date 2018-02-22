import { Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }


  getMenus(){
    return this.http.get('assets/data/menus.json')
     .map((response:Response)=>response.json());
  }
}
