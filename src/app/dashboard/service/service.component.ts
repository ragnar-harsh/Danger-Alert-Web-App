import { Component, OnInit } from '@angular/core';
import { AlertModels } from '../Data-Services/AlertModels.service';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/Service-Repository/dashboard.service';
import { UserStoreService } from 'src/app/Service-Repository/user-store.service';
import { MyHttpServiceService } from 'src/app/Service-Repository/my-http-service.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/Service-Repository/alert.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  Alerts: any = [];
  CustomAlerts: any = [];
  mobile: string;


  constructor(private alertModel: AlertModels, private route: ActivatedRoute,
    private dashService: DashboardService, private userStore: UserStoreService,
    private authentication: MyHttpServiceService, private toastr: ToastrService,
    private alertService: AlertService) { }


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



  RaiseAlert(type: string) {
    if (confirm("Are you sure to Raise Alert ? ")) {
      this.alertService.RaiseAlert(type, this.mobile).subscribe((res: any) => {
        this.toastr.info(res.message);
      });
    }
  }

}
