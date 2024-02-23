import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailService } from '../Data-Services/UserDetail.service';
import { UserStoreService } from 'src/app/Service-Repository/user-store.service';
import { MyHttpServiceService } from 'src/app/Service-Repository/my-http-service.service';
import { DashboardService } from 'src/app/Service-Repository/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface ProfileModel {
  name : string,
  dob : string,
  gender : string,
  email : string ,
  age : number,
  adhaar : string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetail: ProfileModel = {
    name: '',
    dob: '',
    // mobile: '',
    gender: '',
    email: '',
    age: 0,
    adhaar: ''
  };

  // userDetail : any =[];
  editMode: boolean = false;
  
  OtpField : boolean = false;

  EnteredOTP : any;
  otp : any;

  // ProfileForm! : FormGroup;

  mobile : any;
  // name:any;
  // dob: any;
  // mobile: any;
  // email: any;
  // gender: any;
  // age: any;
  // adhaar: any;
  constructor(private model: UserDetailService, private router: Router, 
    private activatedRoute: ActivatedRoute, private userStore : UserStoreService,
    private authentication: MyHttpServiceService, private dashService: DashboardService,
    private toastr: ToastrService){ }

    
  ngOnInit(): void {
      // this.userDetail = this.model.UserDetail;

      this.userStore.getMobileFromStore().subscribe((val) => {
        let mobileFromToken = this.authentication.getMobileFromToken();
        this.mobile = val || mobileFromToken;
      })

      this.dashService.getUserDetail(this.mobile).subscribe((res :any) => {
        this.userDetail = res;
      })

      this.activatedRoute.queryParamMap.subscribe((Param) => {
        this.editMode=Boolean(Param.get('edit'));
      })

  } 


  //Edit Button
  // editButton(){
  //   this.ProfileForm = this.formBuilder.group({
  //     userDetail.name : ['', Validators.required],
  //     userDetail.age = ['', Validators.required],
  //     userDetail.gender : ['', Validators.required],
  //     userDetail.email : ['', Validators.required],
  //     userDetail.mobile : ['', Validators.required],
  //     userDetail.adhaar : ['', Validators.required],
  //   });
  // }


  //Save Button
  verifyProfile(){
    if(this.userDetail.name && this.userDetail.adhaar && this.userDetail.age && this.userDetail.email && this.userDetail.gender){
      this.dashService.GenerateOTP(this.mobile).subscribe((res : any) => {
        this.toastr.info(res.message);
        this.otp = res.otp;
        this.OtpField = true;
        this.editMode = false;
      },
      (error)=> {
        this.toastr.error("Some Error Occured");
      });
    }
    else{
      this.toastr.warning(" Incorrect Form ", "Please Fill all the fields. All fields are Required");
    }
    

    
  }


  //Save Profile
  saveProfile(){
    this.dashService.EditUser(this.userDetail, this.EnteredOTP, this.mobile).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.OtpField = false
      this.otp = null;
    },
    (error) => {
      this.toastr.error("Incorrect OTP");
    })
  }
}
