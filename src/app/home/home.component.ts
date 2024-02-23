import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyHttpServiceService } from '../Service-Repository/my-http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  constructor(private router : Router, private authentication: MyHttpServiceService){
    if(this.isLoggedIn){
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authentication.isLoggedIn();
    if(this.isLoggedIn){
      this.router.navigate(['/dashboard']);
    }
  }

}
