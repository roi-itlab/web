/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MarkerComponent } from '../marker/marker.component';
import { MapService } from '../../services/map.service';

import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('Marker', () => {

  let fixture;
  let marker: MarkerComponent;
  let spy;
  let addMarker;
  let removeMarker;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        MarkerComponent
      ],
      providers: [
        MapService
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],      
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkerComponent);
    marker = fixture.debugElement.componentInstance;
    addMarker  = fixture.debugElement.query(By.css('#add-marker'));
    removeMarker  = fixture.debugElement.query(By.css('#remove-marker'));
  });

  it('should create the app', async(() => {
    expect(marker).toBeTruthy();
  }));

  it('should toggle editing and removing', async(() => {
    fixture.detectChanges();
    addMarker.triggerEventHandler('click', null);
    expect(marker.editing).toBeTruthy();
    removeMarker.triggerEventHandler('click', null);
    expect(marker.removing).toBeTruthy();
    expect(marker.editing).toBeFalsy();
  }));

});
