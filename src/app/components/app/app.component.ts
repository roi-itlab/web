import { Component, ViewChild } from '@angular/core';
import { NavigatorComponent } from '../navigator/navigator.component';
import { MarkerComponent } from '../marker/marker.component';
import { MapService } from '../../services/map.service';
import { GeocodingService } from '../../services/geocoding.service';
import { Location } from '../../core/location.class';
import { GeoRouteService } from '../../services/georoute.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: []
})
export class AppComponent {

    @ViewChild(MarkerComponent) markerComponent: MarkerComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService, private route: GeoRouteService) {
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
        function getFeatureColor(properties: any) {
            switch (properties.load) {
                case 1: return "#55FF00";
                case 2: return "#77FF00";
                case 3: return "#9AFF00";
                case 4: return "#BCFF00";
                case 5: return "#DEFF00";
                case 6: return "#FFFF00";
                case 7: return "#FFDE00";
                case 8: return "#FFBC00";
                case 9: return "#FF9A00";
                case 10: return "#FF7700";
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
        this.route.getRoute(5).subscribe((geoJson) => {
            var layer = L.vectorGrid.slicer(geoJson, tileOptions)
                .addTo(map);
        });
        this.mapService.map = map;
        this.geocoder.getCurrentLocation()
            .subscribe(
            location => map.panTo([location.latitude, location.longitude]),
            err => console.error(err)
            );
    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
    }
}
