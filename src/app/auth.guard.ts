import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
  
    const userRole = this.authService.getUserRoleFromToken(token);
    const requiredRole = route.data['role'] as string;
  
    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/login']);
      return false;
    }
  
    return true;
  }
  
}