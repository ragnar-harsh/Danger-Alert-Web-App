import { Component, OnInit } from '@angular/core';
import { MyHttpServiceService } from '../Service-Repository/my-http-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../Service-Repository/user-store.service';
import { DashboardService } from '../Service-Repository/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fullName: string = "";
  role: string = "";
  sidebar: any = true;
  mobile: string = "";

  lattitude : any;
  longitude : any;

  activeInbox = false;

  constructor(private authentication: MyHttpServiceService, private toastr: ToastrService,
    private userStore: UserStoreService, private dashService : DashboardService) { }


  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.authentication.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    })

    this.userStore.getRoleFromStore().subscribe((val) => {
      let rolFromToken = this.authentication.getRoleFromToken();
      this.role = val || rolFromToken;
    })

    this.userStore.getMobileFromStore().subscribe((val) => {
      let mobileFromToken = this.authentication.getMobileFromToken();
      this.mobile = val || mobileFromToken;
    })

    this.getLocation();
  }

  togglebar() {
    this.sidebar = !this.sidebar;
  }

  logout() {
    this.toastr.success("You Logged out Successfull!", "Logout Successfully", { easeTime: 1000 });
    this.authentication.signOut();
  }


  getLocation() {
    if (navigator.geolocation) {

      //Getting Location
      navigator.geolocation.getCurrentPosition((position) => {
        this.lattitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.lattitude + " " + this.longitude);
      });
      setTimeout(() => {
        this.dashService.UpdateLocation(this.mobile, this.lattitude, this.longitude);
      }, 1000);
    }
  }
}
