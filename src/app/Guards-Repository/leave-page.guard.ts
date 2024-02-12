import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface IDeactivate{
  canExit : () => Observable<boolean> | Promise<boolean> | boolean;
}

export const leavePageGuard: CanDeactivateFn<IDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.canExit();
};
