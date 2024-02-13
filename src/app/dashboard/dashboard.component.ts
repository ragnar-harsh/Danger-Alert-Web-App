import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  sidebar: any = true;

  togglebar(){
    this.sidebar = !this.sidebar;
    console.log(this.sidebar);

  }
}
