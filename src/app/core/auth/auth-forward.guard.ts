import { CanActivateFn } from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {Location} from "@angular/common";

export const authForwardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const location = inject(Location);

  if (authService.getLoggedIn()) {
    location.back();
    return false;
  }

  return true;
};




//
// import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}
//
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//
//     if (this.authService.isLoggedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['/']);
//       return false;
//     }
//   }
// }
