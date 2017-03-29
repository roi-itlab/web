import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class GeoRouteService {
    constructor(private http:Http)  {

    }

     public getRoute(id: number): Observable<any> {
         return this.http.get("/assets/routes/route" + id + ".geojson")
            .map((res:any) => res.json());
     }

     public getRouteByName(name: string): Observable<any> {
         return this.http.get("/assets/routes/" + name + ".geojson")
            .map((res:any) => res.json());
     }
     
}