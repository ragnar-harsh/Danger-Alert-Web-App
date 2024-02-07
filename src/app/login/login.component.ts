import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyHttpServiceService } from '../Service/my-http-service.service';
// import { HttpServiceService } from '../http-service.service';
// import AOS from 'aos';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  UserMobile : any;
  EnteredOTP: any ;

  usersList1 :any=[];
  sentOtp: any;
 
  constructor(private router: Router, private apiService : MyHttpServiceService ){

    this.apiService.getUserr().subscribe((data: any[]) => {
      this.usersList1 = data;
    })
  }

  GenerateOtpLogin(){
    this.apiService.genLoginOTP(this.UserMobile).subscribe((data : any) =>{
      this.sentOtp = data;
    },
    (error) => {alert("Invalid Mobile Number");}
    
    );
  }

  verifyLoginOtp(){
    this.apiService.verifyLogin(this.UserMobile, this.EnteredOTP).subscribe(
      (response) => {
        this.router.navigate(['dashboard']);
      },
      (error) => {alert("Incorrect  OTP");}
    );
    

    console.log("OTP Verified!");
  }

  GoToSignUpPage(){
    this.router.navigate(["./signup"])
  }






}
















//  private  apiService :HttpServiceService )  {

    // this.apiService.getUser().subscribe((data: any[]) => {
    //   console.log(data ,' From API call');
    //   this.usersList = data;

    // });
  

  // ngOnInit(){
  //   AOS.init();
  // }














  // ngOnInit() {

  // }

  // status : boolean = true ;

  // ChangePage(clickedItem: any){
  //   // console.log(clickedItem);
  //   if(clickedItem.target.value == "signup"){
  //     this.status = false;

  //   }
  //   else{
  //     this.status = true;
  //   }
    
  // }

  // genOTP(CountryCode: any, Mobno: any){
  //   // this.UserMobNo = this.CountryCode.target.value + this.Mobno.target.value;
  //   // console.log(CountryCode.value);
  //   // console.log(Mobno.value);
  //   this.UserMobNo = CountryCode.value + "" + Mobno.value ;
  //   console.log(this.UserMobNo);
  // }



  // VerifyLogin(EnteredOTP1: any){
  //   console.log('before post');
  //   this.apiService.verifyloginOTP("98989898898",this.EnteredOTP).subscribe();
  //     // {console.log(res, 'From Post response');}); 
  //   console.log('After post');  
  //   console.log(this.EnteredOTP);
  // }


