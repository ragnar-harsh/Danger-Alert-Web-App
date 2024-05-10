import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  longitude: any;
  lattitude: any;
  latlong: string[];


  constructor() { }

  ngOnInit(): void {
    this.getLocation();
    this.watchPosition();
    // this.Routing();


  }



  //Get the Location
  getLocation() {
    if (navigator.geolocation) {

      //Getting Location
      navigator.geolocation.getCurrentPosition((position) => {
        this.lattitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.latlong = [this.lattitude, this.longitude];
        // console.log(`lattitude : ${this.lattitude} , Longitude: ${this.longitude}`);

        //Map View
        let map = L.map('map').setView(this.latlong, 13);

        //Title Layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);



        //Markers
        var marker = L.marker(this.latlong).addTo(map);

        //Click Event on Map
        map.on('click', function (e) {
          console.log(e);
          var lat = e.latlng.lat;
          var lng = e.latlng.lng;
          // var secondMarker = L.marker([e.latLng.lat, e.latLng.lng]).addTo(map);
          var secondMarker = L.marker([lat, lng]).addTo(map);


          // L.Routing.control({
          //   waypoints: [
          //     L.latLng(this.lattitude, this.longitude),
          //     L.latLng(lat, lng)
          //   ]
          // }).on('routesfound', function (e) {
          //   console.log(e);
          //   e.routes[0].coordinates.forEach(function (coords, index) {
          //     setTimeout(() => {
          //       marker.setLatLng([coords.lat, coords.lng])
          //     }, 100 * index)
          //   })
          // })
          
          // .addTo(map);
        })


        //Routing & Mapping
        L.Routing.control({
          waypoints: [
            L.latLng(this.lattitude, this.longitude),
            L.latLng(26.8917926, 82.0589647)
          ]
        }).addTo(map);
      })
    }
    else {
      console.log("No support for Location");
    }
  }



  //Monitor the Location
  watchPosition() {
    let id = navigator.geolocation.watchPosition((position) => {
      // console.log(`lattitude : ${position.coords.latitude} , Longitude: ${position.coords.longitude}`);
      // console.log("called");
    },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: 0
      }
    );
  }

  // Routing() {
  //   L.Routing.control({
  //     waypoints: [
  //       L.latLng(57.74, 11.94),
  //       L.latLng(57.6792, 11.949)
  //     ]
  //   }).addTo(map);
  // }




}
