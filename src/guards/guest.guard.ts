import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../components/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const session = await this.authService.getSession();
    if (session) {
      return this.router.createUrlTree(['/']); // already logged in → home
    } else {
      return true; // allow login/signup
    }
  }
}
