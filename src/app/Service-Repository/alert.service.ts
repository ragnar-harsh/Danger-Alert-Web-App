import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  basePath = 'apistate/';

  constructor(private http: HttpClient, private toastr : ToastrService,
    private router : Router
  ) { }


  /////////////
  //Raise Alert
  /////////////

  RaiseAlert(type: string, mobile: string){
    var url = `${this.basePath}AlertRaised`;
    let urlBodyParams = new URLSearchParams();
    urlBodyParams.append('mobile', mobile);
    urlBodyParams.append('type', type);
    this.http.post<any>(url, urlBodyParams, httpOptions).subscribe((res) => {
      this.toastr.info(res.message);
      this.router.navigate(['/dashboard/map']);
    })
  }

  //Raise Custom Alert
  RaiseCustomAlert(mobile : string, customAlert : any) : Observable<any[]>{
    var url = `${this.basePath}CustomAlertRaised`;
    let urlBodyParams = new URLSearchParams();
    urlBodyParams.append('mobile', mobile);
    urlBodyParams.append('title', customAlert.title);
    urlBodyParams.append('message', customAlert.message);
    return this.http.post<any>(url, urlBodyParams, httpOptions);
  }


  //Get Service Provider
  GetServiceProvider(mobile : string, type : string) : Observable<any[]>{
    var url = `${this.basePath}GetServiceProvider`;
    let urlBodyParams = new URLSearchParams();
    urlBodyParams.append('mobile', mobile);
    urlBodyParams.append('type', type);
    return this.http.post<any>(url, urlBodyParams, httpOptions);
  }


  //Drop Alert
  DropAlert(mobile: string, type: string) {
    var url = `${this.basePath}DropAlert`;
    let urlBodyParams = new URLSearchParams();
    urlBodyParams.append('mobile', mobile);
    urlBodyParams.append('type', type);
    this.http.post<any>(url, urlBodyParams, httpOptions).subscribe((res : any) => {
      this.toastr.info(res.message);
    });
    this.router.navigate(['/dashboard/service']);
  }


  
  

}
