import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../utility/notification.service';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponent implements OnInit {
 private user : User
  constructor(private authService:AuthService,private router:Router,public notifyService : NotificationService) { }

  ngOnInit() {
    this.user={
      name:'',
      password:'',
      address:'',
      confirmPassword:'',
      email:'',
      phoneNumber:'',
      registerAs:'',
      latitude:'',
      longitude:''
    }
  }
  register(form){
   this.user={
     name : form.name,
     password : form.password,
     address : form.address,
     confirmPassword : form.confirmPassword,
     email : form.email,
     phoneNumber : form.phoneNumber,
     registerAs : form.registerAs,
     latitude : localStorage.getItem("lat"),
     longitude : localStorage.getItem("lng")
   }
   console.log("user",this.user);
   
   if(localStorage.getItem("lat") === null && localStorage.getItem("lng") === null){
     localStorage.setItem("user",JSON.stringify(this.user));
     this.notifyService.showInfo("Please save your location to continue","Save Location");
     this.router.navigate(["/location"]);
    }else{
    this.authService.registerUser(this.user).subscribe(response=>{
      console.log("success");
      this.router.navigate(["/login"])
    })
   }
    
  }

}
