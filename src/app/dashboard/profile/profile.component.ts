import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailService } from '../Data-Services/UserDetail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetail: any= {};
  editMode: boolean = false;
  // name:any;
  // dob: any;
  // mobile: any;
  // email: any;
  // gender: any;
  // age: any;
  // adhaar: any;
  constructor(private model: UserDetailService, private router: Router, 
    private activatedRoute: ActivatedRoute){ }

    
  ngOnInit(): void {
      this.userDetail = this.model.UserDetail;
      // console.log(this.userdet);
      this.activatedRoute.queryParamMap.subscribe((Param) => {
        this.editMode=Boolean(Param.get('edit'));
      })

  } 
}
