import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from '../utility/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthService,private notifyService:NotificationService,private router : Router ) {

   }
   canActivate() {
    if (this.authService.isLoggedIn()) return true;

    this.notifyService.showError("Login to continue","Login");
    this.router.navigate(["/login"]);
    return false;
  }
}
