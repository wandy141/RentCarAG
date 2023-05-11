import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiRouteService {

  constructor(private router: Router) { }



  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    const loggedIn = localStorage.getItem('value') === 'true';
  
    if (loggedIn) {
      return true;
    } else {
      return this.router.parseUrl('login');
    }


}
}
