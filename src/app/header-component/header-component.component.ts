import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponent implements OnInit {
 user:any;
  constructor(public authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.authService.getEmitter().subscribe(payload => {
      this.user = payload;
    });
    if(localStorage.getItem("username")!=null){
      this.user = localStorage.getItem("username");
     }
    }

  logout(){
    this.authService.logout();
  }

  openDialog(){
    $("#myModal").modal('show');  
  }
  goToLogin(){
    this.router.navigate(["/login"]);
    $("#myModal").modal('hide'); 
    $("#login").addClass("active"); 
  }
  goToRegister(){
    this.router.navigate(["/register"]);
    $("#myModal").modal('hide');  
  }
}


