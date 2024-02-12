import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
})
export class AppComponent implements OnInit{

  displayLoadingIndicator = false;

  constructor(private router : Router){
    Aos.init();
  }
  ngOnInit(): void {
    this.router.events.subscribe((navEvent) => {
      if(navEvent instanceof NavigationStart){
        this.displayLoadingIndicator = true;
      }
      if(navEvent instanceof NavigationEnd || navEvent instanceof NavigationCancel || navEvent instanceof NavigationError){
        this.displayLoadingIndicator = false;
      }
    })
  }

side : boolean = false;

  sidebar(){
    this.side = !this.side;
  }

}