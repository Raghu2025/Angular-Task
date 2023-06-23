import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const role = localStorage.getItem("Role")
    const allowedRole = Object.values(route.data)
    const id  = localStorage.getItem('id')
    if(allowedRole.includes(role) && id){
          return true
    }
    // this.router.navigateByUrl()
    return false
  }


}
