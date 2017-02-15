/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NavigatorComponent } from '../navigator/navigator.component';
import { MapService } from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';

import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';

describe('Mavigator', () => {

  let fixture: ComponentFixture<NavigatorComponent>;
  let navigator: NavigatorComponent;
  let spy;
  let geocodingService: GeocodingService;
  let goto;
  let input: HTMLInputElement;

  let mockMapService = jasmine.createSpyObj('MapService', ['disableMouseEvent']);
  mockMapService.map = jasmine.createSpyObj('Map', ['fitBounds']);

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        NavigatorComponent
      ],
      providers: [
        { provide: MapService, useValue: mockMapService },
        GeocodingService
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],      
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigatorComponent);
    navigator = fixture.debugElement.componentInstance;
    geocodingService = fixture.debugElement.injector.get(GeocodingService);
    let testLocation = {location: L.latLngBounds(
                  {
                  "lat" : 51.6723432,
                  "lng" : 0.1482711
                  },
                  {
                  "lat" : 51.38494009999999,
                  "lng" : -0.3514683
                  }),
                  address: "London, UK"};
    goto  = fixture.debugElement.query(By.css('#goto'));
    input  = fixture.nativeElement.querySelector('#place-input');

    spyOn(geocodingService, 'geocode').and.returnValue(Observable.from([testLocation]));
  });

  it('should create the app', async(() => {
    expect(navigator).toBeTruthy();
  }));

  it('should geocode', async(() => {
    fixture.detectChanges();
    expect(mockMapService.disableMouseEvent).toHaveBeenCalledTimes(2);
    input.value = 'london';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();    
    expect(navigator.address).toEqual('london');
    goto.triggerEventHandler('click', null);
    expect(geocodingService.geocode).toHaveBeenCalledWith('london');
    expect(navigator.address).toEqual('London, UK');
  }));
});
