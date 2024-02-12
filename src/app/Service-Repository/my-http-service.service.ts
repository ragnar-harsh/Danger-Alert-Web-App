import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
}

@Injectable({
  providedIn: 'root'
})


export class MyHttpServiceService {
  apiURL = 'apilocal/AuthenticationController/';
  constructor( private http : HttpClient) { }

  getUserr() : Observable<any[]>{
    var URL = `${this.apiURL}userList`;
    return this.http.get<any>(URL);
  }

  genSignupOTP(mob : any) : Observable<any[]>{
    var URL = `${this.apiURL}genSignupOtp`+`?mob=`+mob;
    console.log(URL);
    return this.http.get<any>(URL);
  }

  genLoginOTP(mob : any) : Observable<any[]>{
    var URL = `${this.apiURL}genLoginOtp`+`?mob=`+mob;
    console.log(URL);
    return this.http.get<any>(URL);
  }

  verifyLogin(mob : any, EnteredOtp : any) : Observable<any[]>{
    var URL = `${this.apiURL}login`+`?mob=`+mob+`&otp=`+EnteredOtp;
    console.log(URL);
    return this.http.get<any>(URL);
  }

  verifyRegistrationOTP(name: any, age: any, email: any, mobile: any, gender: any, otp : any) : Observable<any[]>{
    var URL = `${this.apiURL}register`;
    let URLBodyparams = new URLSearchParams();
    URLBodyparams.append('name', name);
    URLBodyparams.append('age', age);
    URLBodyparams.append('email', email);
    URLBodyparams.append('mobile', mobile);
    URLBodyparams.append('gender', gender);
    URLBodyparams.append('otp', otp);

    return this.http.post<any>(URL, URLBodyparams, httpOptions);
  }
}
