import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Service-Repository/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { MyHttpServiceService } from 'src/app/Service-Repository/my-http-service.service';
import { UserStoreService } from 'src/app/Service-Repository/user-store.service';

interface customAlertModel{
  id : number;
  title: string;
  message: string;
}

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})


export class CustomAlertComponent implements OnInit{

  mobile : any;

  AlertId : number = 0;
  AlertName: any;
  AlertMessage: any;

  createAlert = false;
  CustomAlerts : any= [];

  constructor(private dashService: DashboardService,
    private toastr : ToastrService, private authentication : MyHttpServiceService,
    private userStore : UserStoreService){}

  ngOnInit(): void {
    this.userStore.getMobileFromStore().subscribe((val) => {
      let mobileFromToken = this.authentication.getMobileFromToken();
      this.mobile = val || mobileFromToken;
    })

    this.dashService.getAllAlerts(this.mobile).subscribe((response: any) => {
      this.CustomAlerts = response;
      for(let i = 0; i < 3; i++){
        if(this.CustomAlerts[i].id == -1){
          this.AlertId = i+1;
        }
      }
    });

  }


//Add Alert Button
  AddAlert(){
    if(this.AlertId == 0){
      this.toastr.warning("Only 3 Custom Alerts can be Added", "No more Alerts Allowed");
    }else{
      this.createAlert = true;
    }
    
  }


//Remove Alerts
  RemoveAlert(i : any){
    if(confirm("Are you sure to Remove this custom Alert?")){
      this.AlertId = i + 1;
      this.dashService.RemoveAlert(i + 1, this.mobile).subscribe((response : any) => {
        this.toastr.info(response.message);
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }    
  }


//Add Custom Alerts

  CreateYourAlert(){
    if(this.AlertName && this.AlertMessage){
      const alert : customAlertModel = {
        id: this.AlertId,
        title : this.AlertName,
        message: this.AlertMessage
      };

      this.dashService.AddAlert(alert, this.mobile).subscribe((response: any) => {
        this.toastr.success(response.message);
      })

      this.createAlert = false;
      setTimeout(() => {
        window.location.reload();
      },2000);
    }
    else{
      this.toastr.info("Since the Information is Not Provided", " No Members Added ");
      this.createAlert = false;
    }
  }


}
