import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Service-Repository/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from 'src/app/Service-Repository/user-store.service';
import { MyHttpServiceService } from 'src/app/Service-Repository/my-http-service.service';
import { Router } from '@angular/router';



interface MemberModel{
  id : number;
  name : string;
  mobile : string;
}


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})




export class MemberComponent implements OnInit{
  addMemeber = false;
  Members : any = [];
  Name: any;
  Mobile: any;
  id : number = 0;
  mob : any;
  temp : any = [];

  constructor(private dashService : DashboardService, private router : Router,
    private toastr : ToastrService, private userStore : UserStoreService,
    private authentication : MyHttpServiceService){}




  ngOnInit(): void {
    this.userStore.getMobileFromStore().subscribe((val) => {
      let mobileFromToken = this.authentication.getMobileFromToken();
      this.mob = val || mobileFromToken;
    })

    this.dashService.getAllMember(this.mob).subscribe((value) => {
      this.Members = value;
      for(let i = 0; i<3;  i++){
        if(this.Members[i].id == -1){
          this.id = i+1;
        }
      }
    });

  }


  

//Add Member Button
  AddMemeber(){
    if(this.id == 0){
      this.toastr.warning("Only 3 Members can be Added", "No more Members Allowed");
    }else{
      this.addMemeber = true;
    }
    
  }


// Save the Member
  SaveMemeber(){
    if(this.Name && this.Mobile){
      const member : MemberModel = {
        id : this.id,
        name: this.Name,
        mobile : this.Mobile
      };

      this.dashService.AddMember(member, this.mob).subscribe((res : any) => {
        this.toastr.success(res.message)
      });
      this.addMemeber = false;
      
      setTimeout(() => {
      window.location.reload();
      }, 2000);
      // this.router.navigate(['dashboard/members']);
    }
    else{
      this.toastr.info("Since the Information is Not Provided", " No Members Added ");
      this.addMemeber = false;
    }
  }


//Remove the Member
  RemoveMember(i : any){
    if(confirm("Are you sure to Remove the Member?")){
      this.id = i+1;
      this.dashService.RemoveMember(i+1, this.mob).subscribe((res : any) => {
        this.toastr.success(res.message);
      })
      // this.router.navigate(['dashboard/members']);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }    
  }
}
