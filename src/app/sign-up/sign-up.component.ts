import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyHttpServiceService } from '../Service/my-http-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

// @Input()
// maxLength : number;



export class SignUpComponent {
  UserName : any ;
  UserAge : any;
  UserEmail : any;
  UserGender : any;
  UserCountryCode : any;
  UserMobno : any;
  UserMobile : any;
  EnteredOTP : any;
  sentOtp : any;
  FormBuilder: any;

  // form: FormGroup = new FormGroup( {
  //   UserMobile : new FormControl('',
  //   [Validators.required, Validators.minLength(10)])
  // });
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