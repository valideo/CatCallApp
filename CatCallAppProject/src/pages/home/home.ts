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

        /*Initializing Map*/
        mapboxgl.accessToken = 'pk.eyJ1IjoidmFsaWRlbyIsImEiOiJjajlxOGJzbWo1cnVlMnFxcXNlOG5odzdtIn0.C3pvn7CMluT7KUw6J7N8lQ';
        var map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [0, 0],
            zoom: 14,
            pitch: 50,
            minZoom: 2, //restrict map zoom - buildings not visible beyond 13
            maxZoom: 17,
            container: 'map'
        });

    }
}