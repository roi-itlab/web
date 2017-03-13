import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AppComponent} from './components/app/app.component';
import {NavigatorComponent} from './components/navigator/navigator.component';
import {MarkerComponent} from './components/marker/marker.component';

import {MapService} from './services/map.service';
import {GeocodingService} from './services/geocoding.service';
import {GeoRouteService} from './services/georoute.service';

@NgModule({
    declarations: [
        AppComponent,
        NavigatorComponent,
        MarkerComponent
    ],
    providers: [
        MapService,
        GeocodingService,
        GeoRouteService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
