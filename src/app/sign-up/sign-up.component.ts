import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyHttpServiceService } from '../Service-Repository/my-http-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  UserName : any ;
  UserAge : any;
  UserEmail : any;
  UserGender : any;
  UserCountryCode : any;
  UserMobile : any;
  EnteredOTP : any;
  sentOtp : any;
  AccountType : any;
  Department : any;
  
  constructor(private route: Router, private apiService : MyHttpServiceService ) {}

  GenerateOtp(){
    this.apiService.genSignupOTP(this.UserMobile).subscribe((data : any) =>{
      this.sentOtp = data;
    },
    (error) => { alert("Invalid Mobile No.");}
    );
  }

  VerifyOTP(){
    
    this.apiService.verifyRegistrationOTP(this.UserName,
      this.UserAge, this.UserEmail, this.UserMobile, this.UserGender, this.EnteredOTP).subscribe(
        (response) => {
          alert("Registered Successfully");

          this.route.navigate(['login']);
        },
        (error) => {alert("Incorrect  OTP");}

      );
        

  }

  canExit(){
    if(this.UserEmail || this.UserGender || this.UserMobile || this.UserMobile || this.UserName){
      return confirm("All the data will be Lost!! Are you sure to exit??");
    }else{
      return true;
    }
  }


  GoToLoginPage(){
    this.route.navigate(['./login']);
  }

}















// RegUser(UserName: any, UserAge: any, UserEmail: any, UserGender: any, UserCountryCode: any, UserMobno: any ){
  //   console.log(UserName.value);
  //   console.log(UserAge.value);

  //   console.log(UserEmail.value);

  //   console.log(UserGender.value);
  //   this.UserMobile = UserCountryCode.value + "" + UserMobno.value;
  //   console.log(this.UserMobile);

  // }

  // form = this.forms.group({
  //   UserMobile: [null, [Validators.required, Validators.pattern('[0-9]{10}')]]
  // });