import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  constructor(private activatedRoute : ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value) => 
    {
      this.jumpTo(value);
    });
  }
  jumpTo(section : any){
    document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
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
