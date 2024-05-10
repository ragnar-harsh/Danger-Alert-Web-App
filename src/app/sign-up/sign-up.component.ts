import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyHttpServiceService } from '../Service-Repository/my-http-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../Helper-Repository/FormValidator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  // UserCountryCode : any;
  UserName : any ;
  UserAge : any;
  UserEmail : any;
  UserGender : any;
  UserMobile : any;
  EnteredOTP : any;
  
  sentOtp : any;
  
  AccountType : any;
  Department : any = null;

  AccType : any;

  signupForm! : FormGroup;
  
  constructor(private route: Router, private apiService : MyHttpServiceService,
    private formBuilder : FormBuilder, private toastr: ToastrService ) {}


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      UserName : ['', Validators.required],
      UserAge : ['', Validators.required],
      UserGender : ['', Validators.required],
      UserMobile : ['', Validators.required],
      UserEmail : ['', Validators.required],
      AccType : ['', Validators.required],
      Department : ['', Validators.nullValidator],
      EnteredOTP : ['', Validators.required]
    });
  }


// Generate OTP 
  GenerateOtp(){
    if(this.UserMobile){
      this.apiService.genSignupOTP(this.UserMobile).subscribe((data : any) =>{
        this.toastr.info("Please Enter the OTP to register.", data.message);
        this.sentOtp = data.otp;
      },
      (error) => { this.toastr.error("Enter Correct Mobile no."); }
      );
    }
    else{
      this.toastr.error("Enter Correct Mobile no.");
    }

  }

  VerifyOTP(){
    if(this.signupForm.valid){
      this.apiService.verifyRegistrationOTP(this.UserName,
        this.UserAge, this.UserEmail, this.UserMobile, this.UserGender, this.EnteredOTP, this.Department).subscribe(
          (response: any) => {
            this.toastr.success("User is Registered. Please Login", response.message, {easeTime: 1000});
            this.signupForm.reset();
  
            this.route.navigate(['login']);
          },
          (error) => {this.toastr.error("OTP is incorrect");}
  
        );
    }
    else{
      // console.log("Form Invalid!");
      FormValidator.ValidataAllFormFields(this.signupForm);
      this.toastr.error("Please fill with Correct Details", "Invalid Form" , {easeTime: 1000});
    }
      
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