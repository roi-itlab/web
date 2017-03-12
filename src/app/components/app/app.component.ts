import {Component, ViewChild} from '@angular/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';

/// <reference path="../../leaflet.heat.d.ts"/>



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	providers: []
})
export class AppComponent {

	@ViewChild(MarkerComponent) markerComponent: MarkerComponent;

	constructor(private mapService: MapService, private geocoder: GeocodingService) {
	}

	ngOnInit() {
		let map = L.map('map', {
			zoomControl: false,
			center: L.latLng(40.731253, -73.996139),
			zoom: 12,
			minZoom: 4,
			maxZoom: 19,
			layers: [this.mapService.baseMaps.OpenStreetMap]
		});

		L.control.zoom({ position: 'topright' }).addTo(map);
		L.control.layers(this.mapService.baseMaps).addTo(map);
		L.control.scale().addTo(map);

		this.mapService.map = map;
		this.geocoder.getCurrentLocation()
		.subscribe(
			location => map.panTo([location.latitude, location.longitude]),
			err => console.error(err)
			);

		
		let heat = L.heatLayer([
			[59.82836,30.39669,1],
			[60.03541,30.28928,1] ,
			[59.82836,30.39669,1],
			[59.86327,30.31777,1],
			[60.00351,30.40895,1],
			[59.74306,30.58583,1],
			[59.92141,30.28098,1],
			[60.00914,30.35832, 1] ,
			[60.00317,30.32815, 1],
			], {radius: 7, minOpacity:1}).addTo(map);
/*
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'poi.csv', true);
		xhr.send();

		if (xhr.status != 200) {
 			 alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
		} else {
			let array=xhr.responseText.split('|');

			for(var i=2;i<array.length;i+=5){
				heat.addLatLng([+[array[i],+array[i+1]]]);
			}
		}
*/
}

ngAfterViewInit() {
	this.markerComponent.Initialize();
}
}

