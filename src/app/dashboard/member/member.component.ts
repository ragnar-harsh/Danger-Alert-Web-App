import { Component, OnInit } from '@angular/core';
import { AlertModels } from '../Data-Services/AlertModels.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  totalMemeber : number = 0;
  Members : any = [];

  constructor(private model : AlertModels){}

  ngOnInit(): void {
    this.Members = this.model.Members;
  }

  AddMemeber(){
    this.totalMemeber = this.totalMemeber + 1;
  }
}
