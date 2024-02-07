import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicesComponent } from './services/services.component';
import * as Aos from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
})
export class AppComponent {
  constructor(){
    Aos.init();
  }

side : boolean = false;

  sidebar(){
    this.side = !this.side;
  }

}