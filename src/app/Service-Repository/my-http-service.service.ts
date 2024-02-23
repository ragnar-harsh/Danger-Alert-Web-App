import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
}

@Injectable({
  providedIn: 'root'
})


export class MyHttpServiceService {
  // apiURL = "http://localhost:5172/api/AuthenticationController";
  

  apiURL = 'apilocal/';
  userPayload : any;

//Constructor
  constructor( private http : HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }


// GET all Users 
  getUserr() : Observable<any[]>{
    var URL = `${this.apiURL}Authentication/userList`;
    return this.http.get<any>(URL);
  }


//Generate SignUp OTP
  genSignupOTP(mob : any) : Observable<any[]>{
    var URL = `${this.apiURL}Authentication/genSignupOtp`+`?mob=`+mob;
    return this.http.get<any>(URL);
  }


//Generate Login OTP
  genLoginOTP(mob : any) : Observable<any[]>{
    var URL = `${this.apiURL}Authentication/genLoginOtp`+`?mob=`+mob;
    return this.http.get<any>(URL);
  }


// Validate the Login
  verifyLogin(mob : any, EnteredOtp : any) : Observable<any[]>{
    var URL = `${this.apiURL}Authentication/login`;
    let URLBodyparams = new URLSearchParams();
    URLBodyparams.append('mobile', mob);
    URLBodyparams.append('otp', EnteredOtp);
    return this.http.post<any>(URL, URLBodyparams, httpOptions);
  }


//Register New User
  verifyRegistrationOTP(name: any, age: any, email: any, mobile: any, gender: any, otp : any, department : any) : Observable<any[]>{
    var URL = `${this.apiURL}Authentication/register`;
    let URLBodyparams = new URLSearchParams();
    URLBodyparams.append('name', name);
    URLBodyparams.append('age', age);
    URLBodyparams.append('email', email);
    URLBodyparams.append('mobile', mobile);
    URLBodyparams.append('gender', gender);
    URLBodyparams.append('otp', otp);
    URLBodyparams.append('department', department)

    return this.http.post<any>(URL, URLBodyparams, httpOptions);
  }



  
/////////////////
  //Token Handling//
///////////////
  storeToken(token : string){
    localStorage.setItem('DangeAlertToken', token);
  }

  getToken(){
    return localStorage.getItem('DangeAlertToken');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('DangeAlertToken');
  }

  signOut(){
    localStorage.removeItem('DangerAlertToken');
    localStorage.clear();
    this.router.navigate(['login']);
  }

  
///////////
  // JWT Token Handling for Roles and Names from User-Store service
///////////
  //decode Token
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }

  getMobileFromToken(){
    if(this.userPayload){
      return this.userPayload.certserialnumber;
    }
  }
}
