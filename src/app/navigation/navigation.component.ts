import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isDashboardValid : boolean = false;
  ngOnInit(): void {
    localStorage.setItem('LoggedInUserName', 'abcd');
    var mob = localStorage.getItem('LoggedInUserName');
    console.log(mob, 'fromLocalStorage');
    this.isDashboardValid= true;
  }
  side : boolean = false;

  // constructor

  sidebar(){
    this.side = !this.side;
  }

}