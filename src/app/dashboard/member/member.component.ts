import { Component, OnInit } from '@angular/core';
import { AlertModels } from '../Data-Services/AlertModels.service';



interface MemberModel{
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

  constructor(private model : AlertModels){}

  ngOnInit(): void {
    this.Members = this.model.Members;
  }

  

  AddMemeber(){
    this.addMemeber = true;
  }
  SaveMemeber(){
    if(this.Name && this.Mobile){
      const member : MemberModel = {
        name: this.Name,
        mobile : this.Mobile
      };
      this.model.Members.push(member);
      this.addMemeber = false;
    }
    else{
      this.addMemeber = false;
    }
  }

  RemoveMember(i : any){
    if(confirm("Are you sure to Remove the Member?")){
      this.model.Members.splice(i);
    }    
  }
}
