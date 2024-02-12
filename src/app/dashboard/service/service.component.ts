import { Component, OnInit } from '@angular/core';
import { AlertModels } from '../Data-Services/AlertModels.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  Alerts : any = [] ;
  constructor(private alertModel : AlertModels, private route : ActivatedRoute){
    
  }
  ngOnInit() {

    // this.Alerts = this.alertModel.Alerts;

    this.alertModel.getAllAlerts().then((data: any) => {
      this.Alerts = data;
    })

    // this.Alerts = this.route.snapshot.data['Alerts'];
  }



  RaiseAlert(){
    console.log("Alert Raised");
  }

}
