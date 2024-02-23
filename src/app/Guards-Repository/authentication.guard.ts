import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MyHttpServiceService } from '../Service-Repository/my-http-service.service';
import { ToastrService } from 'ngx-toastr';

export const authenticationGuard: CanActivateFn = (route, state) => {
  
  // const currentRoute = route.url[0].path;
  const apiService = inject(MyHttpServiceService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  
  if(apiService.isLoggedIn()){
    return true;
  }else{
    toastr.warning(" You are not Logged in !! Please Login", "Access Denied!!", {easeTime : 1000});
    router.navigate(['/login']);
    return false;
  }
};
