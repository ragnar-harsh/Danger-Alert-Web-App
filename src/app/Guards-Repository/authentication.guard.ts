import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  
  const currentRoute = route.url[0].path;
  const router = inject(Router);
  return true;
  if(currentRoute == 'service'){
    return true;
  }else{
    alert("Access Denied!! You are not Logged in !! Please Login");
    router.navigate(['/login']);
    return false;
  }
};
