import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  template: '{{sidebr}}'
})
export class ServicesComponent {
  constructor(){
    console.log(this.sidebr);
  }


  @Input() sidebr : boolean = false;

  // sidebr : boolean = false;
  side : boolean = false;

  sidebar(){
    this.side = !this.side;
    console.log(this.side);
  }
  
  
  

//   title = 'toaster-not';

//   constructor(private toastr : ToastrService){}


//   showToasterSuccess(){
//     this.toastr.success("Data shown successfully !!", "ItSolutionStuff.com")
// }

// showToasterError(){
//     this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")
// }

// showToasterInfo(){
//     this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
// }

// showToasterWarning(){
//     this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
// }

}
