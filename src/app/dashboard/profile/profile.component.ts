import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/Service-Repository/user-store.service';
import { MyHttpServiceService } from 'src/app/Service-Repository/my-http-service.service';
import { DashboardService } from 'src/app/Service-Repository/dashboard.service';
import { ToastrService } from 'ngx-toastr';

interface ProfileModel {
  name : string,
  dob : string,
  gender : string,
  email : string ,
  age : number,
  adhaar : string
  profileurl : string
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
    gender: '',
    email: '',
    age: 0,
    adhaar: '',
    profileurl: ''
  };

  editMode: boolean = false;
  fileToUpload : File | null = null;
  
  OtpField : boolean = false;

  EnteredOTP : any;
  otp : any;

  mobile : any;
  constructor( private router: Router, 
    private activatedRoute: ActivatedRoute, private userStore : UserStoreService,
    private authentication: MyHttpServiceService, private dashService: DashboardService,
    private toastr: ToastrService){ }

    
  ngOnInit(): void {

      this.userStore.getMobileFromStore().subscribe((val) => {
        let mobileFromToken = this.authentication.getMobileFromToken();
        this.mobile = val || mobileFromToken;
      })

      this.dashService.getUserDetail(this.mobile).subscribe((res :any) => {
        this.userDetail = res;
      })
      console.log(this.userDetail.profileurl);

      this.activatedRoute.queryParamMap.subscribe((Param) => {
        this.editMode=Boolean(Param.get('edit'));
      })

  } 



  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
  }

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
      this.dashService.uploadFile(this.fileToUpload, this.mobile).subscribe((response : any) => {
        this.toastr.success(response.message);
      }, error => {
        this.toastr.error("Error in Profile Uploading");
      });
      this.OtpField = false
      this.otp = null;
    },
    (error) => {
      this.toastr.error("Incorrect OTP");
    })
  }
}
