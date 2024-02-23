import { Component, OnInit } from '@angular/core';
import { AlertModels } from '../Data-Services/AlertModels.service';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/Service-Repository/dashboard.service';
import { UserStoreService } from 'src/app/Service-Repository/user-store.service';
import { MyHttpServiceService } from 'src/app/Service-Repository/my-http-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  Alerts : any = [] ;
  CustomAlerts : any = [];
  mobile: any;


  constructor(private alertModel : AlertModels, private route : ActivatedRoute,
    private dashService: DashboardService, private userStore : UserStoreService,
    private authentication : MyHttpServiceService, private toastr: ToastrService){}


  ngOnInit() {
    this.alertModel.getAllAlerts().then((data: any) => {
      this.Alerts = data;
    });

    this.userStore.getMobileFromStore().subscribe((val) => {
      let mobileFromToken = this.authentication.getMobileFromToken();
      this.mobile = val || mobileFromToken;
    })

    this.dashService.getAllAlerts(this.mobile).subscribe((res) => {
      this.CustomAlerts = res;
    });



    // this.Alerts = this.route.snapshot.data['Alerts'];
  }



  RaiseAlert(){
    this.toastr.info("Alert Raised");
  }

}
