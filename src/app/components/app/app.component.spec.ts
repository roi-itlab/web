/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavigatorComponent } from '../navigator/navigator.component';
import { MarkerComponent } from '../marker/marker.component';
import { MapService } from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';
import {DensityMapService} from '../../services/densitymap.service';
import {GeoRouteService} from '../../services/georoute.service';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('App: Cassandra Premium', () => {

  let fixture;
  let app;
  let spy;
  let geocodingService;

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigatorComponent,
        MarkerComponent
      ],
      providers: [
        MapService,
        GeocodingService,
        GeoRouteService,
        DensityMapService
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],      
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    geocodingService = fixture.debugElement.injector.get(GeocodingService);
    let testLocation = {latitude: 0, longitude: 0};
    spy = spyOn(geocodingService, 'getCurrentLocation').and.returnValue(new BehaviorSubject(testLocation));
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should render title in a nav tag', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav').textContent).toContain('Cassandra');
    expect(geocodingService.getCurrentLocation).not.toHaveBeenCalled();
  }));
});
