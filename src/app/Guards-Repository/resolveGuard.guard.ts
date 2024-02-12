import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AlertModels } from "../dashboard/Data-Services/AlertModels.service";
import { Injectable, inject } from "@angular/core";


@Injectable()
export class resolveGuard implements Resolve<any> {
    constructor(private alertModel : AlertModels){}
    // alertModel = inject(AlertModels);
    data: any;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.alertModel.getAllAlerts().then((data: any) => {
            return this.data;
        })
    }
    
}