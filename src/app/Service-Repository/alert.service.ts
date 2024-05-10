import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isAlertRaised: boolean = false;

  basePath = 'apistate/';

  constructor(private http: HttpClient) { }


  /////////////
  //Raise Alert
  /////////////

  RaiseAlert(type: string, mobile: string): Observable<any[]> {
    var url = `${this.basePath}AlertRaised?mobile=`+ mobile + `&type=` + type; 
    return this.http.post<any>(url, httpOptions);
  }


  
  

}
