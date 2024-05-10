import { Component, DoCheck, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MyHttpServiceService } from './Service-Repository/my-http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, DoCheck {

  displayLoadingIndicator = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authentication: MyHttpServiceService,
  ) {
    Aos.init();
  }


  ngDoCheck(): void {
    this.isLoggedIn = this.authentication.isLoggedIn();
  }


  ngOnInit(): void {
    this.router.events.subscribe((navEvent) => {
      if (navEvent instanceof NavigationStart) {
        this.displayLoadingIndicator = true;
      }
      if (navEvent instanceof NavigationEnd || navEvent instanceof NavigationCancel || navEvent instanceof NavigationError) {
        this.displayLoadingIndicator = false;
      }
    })

    this.isLoggedIn = this.authentication.isLoggedIn();
  }
}