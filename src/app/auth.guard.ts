import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRoleFromToken(token); // Implement this method

    const requiredRole = route.data['role'] as string;

    if (userRole !== requiredRole) {
      this.router.navigate(['/login']); // Redirect to login or an unauthorized page
      return false;
    }

    return true;
  }
}