import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class DensityMapService {
    constructor(private http:Http)  {

    }

     public getLocations(): Observable<any>{
         return this.http.get("/assets/locations/locations1.json").map((response:any) =>
                response.json());
            
     }
}