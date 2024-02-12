import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {


  w = window.innerWidth;
  h = window.innerHeight;
  
  mobile : any;
  name : any;
  message : any;


  // console.log(w, h);

  canExit(){
    if(this.name || this.mobile || this.message){
      return confirm("Changes will be lost !! Are you sure to exit ??");
    }else{
      return true;
    }
  }
  
  
}
