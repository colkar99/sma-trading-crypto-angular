import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot ,RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private route: Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authorization = localStorage.getItem('authorization');
    if (authorization) {
      return true
    } else {
      this.route.navigateByUrl('/');
      return false;
    }
  }
}
