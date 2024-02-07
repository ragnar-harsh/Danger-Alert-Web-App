import { Component } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor() {
    Aos.init();
    
  }

}
