import { Component, OnInit } from '@angular/core';
import { AlertModels } from '../Data-Services/AlertModels.service';

interface customAlertModel{
  icon : string;
  category: string;
  message: string;
}

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})


export class CustomAlertComponent implements OnInit{
  AlertName: any;
  AlertMessage: any;

  createAlert = true;
  customAlerts : any= [];

  constructor(private model : AlertModels){}

  ngOnInit(): void {
    this.customAlerts = this.model.CustomAlerts;
  }

  AddAlert(){
    this.createAlert = true;
  }

  RemoveAlert(i : any){
    if(confirm("Are you sure to Remove the custom Alert?")){
      this.model.CustomAlerts.splice(i);
    }    
  }

  CreateYourAlert(){
    if(this.AlertName && this.AlertMessage){
      const alert : customAlertModel = {
        icon: "bi-exclamation-diamond",
        category : this.AlertName,
        message: this.AlertMessage
      };
      this.model.Alerts.push(alert);
      this.model.CustomAlerts.push(alert);
      this.createAlert = false;
    }
    else{
      this.createAlert = false;
    }
  }


}
