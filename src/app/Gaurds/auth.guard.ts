import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private _AuthService: AuthService, private _Router: Router) { }
   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if (this._AuthService.userRole.getValue() != null && this._AuthService.userToken.getValue() != null) {
       return true;
  //   }
  //   else {
  //     this._Router.navigate(["/login"]);
  //     return false;
  //   }
   }

}
