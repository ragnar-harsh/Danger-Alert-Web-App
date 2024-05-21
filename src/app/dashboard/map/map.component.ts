import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/Service-Repository/alert.service';
import { MyHttpServiceService } from 'src/app/Service-Repository/my-http-service.service';
import { UserStoreService } from 'src/app/Service-Repository/user-store.service';

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
  ServiceProvider: any = null;
  mobile: string;
  type: string;
  AlertRaised : boolean;



  constructor(private alertService: AlertService, private toastr: ToastrService,
    private userStore: UserStoreService, private authentication: MyHttpServiceService
  ) { }

  ngOnInit(): void {

    this.userStore.getMobileFromStore().subscribe((val) => {
      let mobileFromToken = this.authentication.getMobileFromToken();
      this.mobile = val || mobileFromToken;
    })

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.authentication.getRoleFromToken();
      this.type = val || roleFromToken;
    })
    // this.watchPosition();
    // this.Routing();
    this.alertService.GetServiceProvider(this.mobile, this.type).subscribe((res: any) => {
      this.ServiceProvider = res;
    });

    console.log(this.ServiceProvider);
    
    if(this.ServiceProvider){
      this.AlertRaised = true;
    }

    if (this.type == "Service User") {
      this.getLocation();
    }
    else {
      this.MappingForServiceProvider();
    }
  }

  //Drop alert
  DropAlert(){
    const message: string = this.type == "Service User"? "Are you feeling Safe ? " : "Is the user is Safe ?";
    if(confirm(message)){
      if(this.ServiceProvider){
        this.alertService.DropAlert(this.mobile, this.type);
      this.AlertRaised = false;
      }else{
        this.toastr.show("No alert is Raised");
      }
    }
  }



  //Get the Location
  getLocation() {
    if (navigator.geolocation) {

      //Getting Location
      navigator.geolocation.getCurrentPosition((position) => {
        this.lattitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.latlong = [this.lattitude, this.longitude];

        //Map View
        let map = L.map('map').setView(this.latlong, 13);

        //Title Layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);



        //Markers
        var marker = L.marker(this.latlong).addTo(map);

        //Click Event on Map
        // map.on('click', function (e) {
        //   console.log(e);
        //   var lat = e.latlng.lat;
        //   var lng = e.latlng.lng;
        //   // var secondMarker = L.marker([e.latLng.lat, e.latLng.lng]).addTo(map);
        //   var secondMarker = L.marker([lat, lng]).addTo(map);


        //   // L.Routing.control({
        //   //   waypoints: [
        //   //     L.latLng(this.lattitude, this.longitude),
        //   //     L.latLng(lat, lng)
        //   //   ]
        //   // }).on('routesfound', function (e) {
        //   //   console.log(e);
        //   //   e.routes[0].coordinates.forEach(function (coords, index) {
        //   //     setTimeout(() => {
        //   //       marker.setLatLng([coords.lat, coords.lng])
        //   //     }, 100 * index)
        //   //   })
        //   // })

        //   // .addTo(map);
        // })
        // this.RoutetheLoc();


        //Routing & Mapping
        setTimeout(() => {
          if (this.ServiceProvider != null) {
            this.toastr.info(this.ServiceProvider.name + " is nearest to Help you");
            L.Routing.control({
              waypoints: [
                L.latLng(this.lattitude, this.longitude),
                L.latLng(this.ServiceProvider.latitude, this.ServiceProvider.longitude)
              ]
            }).addTo(map);
          }
        }, 2000);
      })
    }
    else {
      console.log("No support for Location");
    }
  }



  //Mapping for the Service Provider
  MappingForServiceProvider() {
    if (navigator.geolocation) {

      //Getting Location
      navigator.geolocation.getCurrentPosition((position) => {
        this.lattitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.latlong = [this.lattitude, this.longitude];

        //Map View
        let map = L.map('map').setView(this.latlong, 13);

        //Title Layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);



        //Markers
        var marker = L.marker(this.latlong).addTo(map);


        //Routing & Mapping
        setTimeout(() => {
          if (this.ServiceProvider != null) {
            this.toastr.info("Someone with mobile no. " + this.ServiceProvider.user_mobile + " needs your Help");
            L.Routing.control({
              waypoints: [
                L.latLng(this.lattitude, this.longitude),
                L.latLng(this.ServiceProvider.user_lat, this.ServiceProvider.user_long)
              ]
            }).addTo(map);
          }
        }, 2000);
      })
    }
    else {
      console.log("No support for Location");
    }
  }




  //Monitor the Location
  // watchPosition() {
  //   let id = navigator.geolocation.watchPosition((position) => {
  //   },
  //     (err) => {
  //       console.log(err);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 60000,
  //       maximumAge: 0
  //     }
  //   );
  // }

  // Routing() {
  //   L.Routing.control({
  //     waypoints: [
  //       L.latLng(57.74, 11.94),
  //       L.latLng(57.6792, 11.949)
  //     ]
  //   }).addTo(map);
  // }




}
