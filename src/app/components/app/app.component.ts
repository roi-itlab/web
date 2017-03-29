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

        function getFeatureColor(properties: any) {
            switch (properties.load) {
                case 1: return "#17077C";
                case 2: return "#073088";
                case 3: return "#077494";
                case 4: return "#06A07D";
                case 5: return "#06AB3A";
                case 6: return "#1DB705";
                case 7: return "#75C304";
                case 8: return "#CEC502";
                case 9: return "#DA6D01";
                case 10: return "#E60A00";
            }
        }
        var tileOptions = {
            maxZoom: 20, 
            tolerance: 5, 
            extent: 4096, 
            buffer: 64,   
            debug: 0,     

            indexMaxZoom: 0,       
            indexMaxPoints: 100000,
            vectorTileLayerStyles: {
                sliced: function (properties, zoom) {
                    return {
                        color: getFeatureColor(properties),
                        fillOpacity: 1,
                        stroke: true,
                        fill: true,

                    }
                }
            }
        };

        L.control.zoom({ position: 'topright' }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);
        this.route.getRouteByName("map_9_0").subscribe((geoJson) => {
            var layer = L.vectorGrid.slicer(geoJson, tileOptions)
                .addTo(map);
        });
	
		this.mapService.map = map;
		// this.geocoder.getCurrentLocation()
		// .subscribe(
		// 	location => map.panTo([location.latitude, location.longitude]),
		// 	err => console.error(err)
		// 	);

//отображение точек на карте - пока отключено, чтобы не мешать
		// var heat;
		// this.densitymap.getLocations().subscribe(res => {
		// 	heat=L.heatLayer(res, {radius: 10, minOpacity:1}).addTo(map);
		// });

	}

	ngAfterViewInit() {
		this.markerComponent.Initialize();
	}
}

