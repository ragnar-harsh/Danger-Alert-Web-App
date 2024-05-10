import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyHttpServiceService } from '../Service-Repository/my-http-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../Helper-Repository/FormValidator';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../Service-Repository/user-store.service';
import { AlertService } from '../Service-Repository/alert.service';
import { getMessaging, getToken } from 'firebase/messaging';
import { environment } from '../../assets/environment/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  UserMobile: any;
  EnteredOTP: any;

  usersList1: any = [];
  sentOtp: any;
  loginForm!: FormGroup;
  fireBaseId : string;
  swr : any;

  constructor(private router: Router, private apiService: MyHttpServiceService,
    private formBuilder: FormBuilder, private toastr: ToastrService,
    private userStore: UserStoreService, private alertService : AlertService ) {

    this.apiService.getUserr().subscribe((data: any[]) => {
      this.usersList1 = data;
    })
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      UserMobile: ['', Validators.required],
      EnteredOTP: ['', Validators.required]
    });
    
    this.requestPermission();
  }


  //Generate OTP

  GenerateOtpLogin() {
    if (this.UserMobile) {
      this.apiService.genLoginOTP(this.UserMobile).subscribe((data: any) => {
        this.toastr.info(data.message);
        this.sentOtp = data.otp;
      },
        (error) => { this.toastr.error("Please Enter the correct Mobile NO.", "Incorrect Mobile Number", { easeTime: 1000 }); }
      );
    } else {
      this.toastr.error("Please Enter the Mobile:");
    }
  }

  GoToSignUpPage() {
    this.router.navigate(["./signup"])
  }


  //Verify Login 
  verifyLoginOtp() {
    if (this.loginForm.valid) {
      this.apiService.verifyLogin(this.UserMobile, this.EnteredOTP, this.fireBaseId).subscribe(
        (response: any) => {
          this.apiService.storeToken(response.token);
          const tokenPayload = this.apiService.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.userStore.setMobileForStore(tokenPayload.certserialnumber);
          this.toastr.success("Your OTP verified Successfully", response.message, { easeTime: 1000 });
          this.router.navigate(['dashboard']);
        },
        (error: any) => { this.toastr.error("Incorrect OTP"); }
      );
    }
    else {
      FormValidator.ValidataAllFormFields(this.loginForm);
      this.toastr.error("Please fill the Form Correctly", "Invalid Details", { easeTime: 1000 });
    }

  }



  // Request Notification Permission
  async requestPermission() {
    const messaging = getMessaging();
      const token = await getToken(messaging, {vapidKey : environment.firebase.vpaidKey }).then((currentId) => {
        if(currentId){
          this.fireBaseId = currentId;
          console.log(currentId);
        }else{
          console.log("some error occured");
        }
      });
    }
  
}
