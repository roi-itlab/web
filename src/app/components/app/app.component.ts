import {Component, ViewChild} from '@angular/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';
import {DensityMapService} from '../../services/densitymap.service';
import {GeoRouteService} from '../../services/georoute.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	providers: []
})
export class AppComponent {

	@ViewChild(MarkerComponent) markerComponent: MarkerComponent;
	constructor(private mapService: MapService, private geocoder: GeocodingService,	private densitymap:DensityMapService, private route: GeoRouteService) {
	}

	ngOnInit() {
		let map = L.map('map', {
			zoomControl: false,
			center: L.latLng(59.9633002,30.2901263),
			zoom: 11,
			minZoom: 4,
			maxZoom: 19,
			layers: [this.mapService.baseMaps.OpenStreetMap]
		});

		L.control.zoom({ position: 'topright' }).addTo(map);
		L.control.layers(this.mapService.baseMaps).addTo(map);
		L.control.scale().addTo(map);
	
		this.mapService.map = map;
		// this.geocoder.getCurrentLocation()
		// .subscribe(
		// 	location => map.panTo([location.latitude, location.longitude]),
		// 	err => console.error(err)
		// 	);

//добавление маршрутов
		this.route.getRoute(2).subscribe((geoJson) =>  L.geoJSON(geoJson,
			{
			style: function(feature: any)
			{
				switch (feature.properties.load)
				{
				case 1: return {color: "#55FF00"};
				case 2: return {color: "#77FF00"};
				case 3: return {color: "#9AFF00"};
				case 4: return {color: "#BCFF00"};
				case 5: return {color: "#DEFF00"};
				case 6: return {color: "#FFFF00"};
				case 7: return {color: "#FFDE00"};
				case 8: return {color: "#FFBC00"};
				case 9: return {color: "#FF9A00"};
				case 10: return {color: "#FF7700"};
				}
			}
			}
		).addTo(map));

//отображение точек на карте
		var heat;
		this.densitymap.getLocations().subscribe(res => {
		heat=L.heatLayer(res, {radius: 10, minOpacity:1}).addTo(map);
		});

}

ngAfterViewInit() {
	this.markerComponent.Initialize();
}
}

