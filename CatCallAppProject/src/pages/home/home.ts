import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from 'ionic-native';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    Coordinates: any;
    watch: any;
    constructor(public navCtrl: NavController) {

    }

ionViewDidEnter() {
  
    /*Initializing geolocation*/
    let options = {
        frequency: 3000,
        enableHighAccuracy: true
    };

    this.watch = Geolocation.watchPosition(options)
        .subscribe((position: Geoposition) => {
            console.log(position);
            this.Coordinates = position.coords;
            this.executemap()
        });
}


executemap(){

    /*Initializing Map*/
    mapboxgl.accessToken = 'pk.eyJ1IjoidmFsaWRlbyIsImEiOiJjajlxOGJzbWo1cnVlMnFxcXNlOG5odzdtIn0.C3pvn7CMluT7KUw6J7N8lQ';
    var map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [this.Coordinates.longitude, this.Coordinates.latitude],
        zoom: 14,
        pitch: 50,
        minZoom: 4, //restrict map zoom - buildings not visible beyond 13
        maxZoom: 19,
        container: 'map'
    });
    map.on('load', function () {
        map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': {
                    'type': 'identity',
                    'property': 'height'
                },
                'fill-extrusion-base': {
                    'type': 'identity',
                    'property': 'min_height'
                },
                'fill-extrusion-opacity': .6
            }
        });
    });
}

}