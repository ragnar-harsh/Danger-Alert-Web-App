import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStoreService } from './user-store.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // basePath = "http://localhost:5172/api/dashboard/";
  basePath = 'apilocal/';
  // mobile : any;

  constructor(private http : HttpClient) { 
    // this.mobile = this.userStore.getMobileFromStore();
  }




////////////
//////Member Controller
////////////


//Add New Member
  AddMember(member : any, mobile : any) : Observable<any[]> {
    var url = `${this.basePath}Dashboard/addMember` + `?mobile=` + mobile;
    let URLBodyparams = new URLSearchParams();
    URLBodyparams.append('id', member.id);
    URLBodyparams.append('name', member.name);
    URLBodyparams.append('mobile', member.mobile);
    return this.http.post<any>(url, URLBodyparams, httpOptions);
  }

  // AddMember(member : any) : Observable<any[]> {
    //   var url = `${this.basePath}addMember`;
  //   return this.http.post<any>(url, member, httpOptions);
  // }


//Remove Member
  RemoveMember(memberId : any, mobile : any) : Observable<any[]> {
    var url = `${this.basePath}Dashboard/removeMember` + `?id=`+ memberId + `&mobile=` + mobile;
    return this.http.get<any>(url);
  }

  
  
//Get ALL Member
getAllMember(mobile: any) : Observable<any[]> {
    var url = `${this.basePath}Dashboard/GetAllMember`+ `?mobile=` + mobile;
    return this.http.get<any>(url);
  }
  




////////////
/////// Alert Controller
////////////

//Add Alert
  AddAlert(alert: any, mobile : any) : Observable<any[]> {
    var url = `${this.basePath}Dashboard/addAlert` + `?mobile=` + mobile;
    let URLBodyparams = new URLSearchParams();
    URLBodyparams.append('id', alert.id);
    URLBodyparams.append('title', alert.title);
    URLBodyparams.append('message', alert.message);
    return this.http.post<any>(url, URLBodyparams, httpOptions);
  }

//Remove Alert
  RemoveAlert(alertId : any, mobile : any) : Observable<any[]> {
    var url = `${this.basePath}Dashboard/removeAlert` + `?id=` + alertId + `&mobile=` + mobile; 
    return this.http.get<any>(url);
  }
  

//Get ALL Alerts
  getAllAlerts(mobile : any) : Observable<any[]> {
    var url = `${this.basePath}Dashboard/GetAllAlerts`+ `?mobile=` + mobile;
    return this.http.get<any>(url);
  }



  //////
  //Get User Detail
  /////
  getUserDetail(mobile : any) : Observable<any[]> {
    var url = `${this.basePath}Dashboard/GetUser` + `?mobile=` + mobile;
    return this.http.get<any>(url);
  }


  //Edit User Detail with Veification of OTP
  EditUser(profile : any, OTP : any, mobile : any) {
    var url = `${this.basePath}Dashboard/EditUser?mobile=` + mobile;
    let URLBodyparams = new URLSearchParams();
    URLBodyparams.append('name', profile.name);
    URLBodyparams.append('age', profile.age);
    URLBodyparams.append('gender', profile.gender);
    URLBodyparams.append('email', profile.email);
    URLBodyparams.append('adhaar', profile.adhaar);
    URLBodyparams.append('otp', OTP);
    return this.http.post<any>(url, URLBodyparams, httpOptions);
  }

  //Generate OTP
  GenerateOTP(mobile : any){
    var url = `${this.basePath}Dashboard/GenerateOtp`+`?mobile=`+mobile;
    return this.http.get<any>(url);
  }


}
