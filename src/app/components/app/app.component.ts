import {Component, ViewChild} from '@angular/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';
import {GeoRouteService} from '../../services/georoute.service';

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

        L.control.zoom({ position: 'topright' }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);
        this.route.getRoute(5 ).subscribe((geoJson) =>  L.geoJSON(geoJson,
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
