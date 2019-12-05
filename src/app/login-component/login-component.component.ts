import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../utility/notification.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent implements OnInit {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService:AuthService,private router:Router,private notifyService:NotificationService) { }

  ngOnInit() {
  }

  login(form){
    this.authService.loginUser(form.username,form.password).subscribe(response=>{
      console.log("resp",response);
      localStorage.setItem("token",response.access_token);
      localStorage.setItem("username",response.userName);
      localStorage.setItem("role",response.roles);
      this.authService.emit(response.userName);
      this.router.navigate(["/"])
    },error=>{
      console.log("err",error);
      // console.log("msg",error.status);

      if(error.status === 400){
          this.notifyService.showError(error.error.error_description,"Register first");
      }
    })
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

}
