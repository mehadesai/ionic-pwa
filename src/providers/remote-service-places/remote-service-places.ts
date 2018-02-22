import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RemoteServicePlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServicePlacesProvider {
  baseUrl='http://localhost';
  constructor(public http: HttpClient) {
    console.log('Hello RemoteServicePlacesProvider Provider');
  }

}
