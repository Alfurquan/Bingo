import { Injectable,EventEmitter,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http : HttpClient,private router:Router) { }

  // Method to register the user
  public registerUser(user:any){
      return this.http.post(environment.api_url + "api/account/register",user);
  }

  // Method to login a user
  public loginUser(username,password):Observable<any>{

    var data = "username="+username+"&password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({
      "Content-Type":"application/x-www-urlencoded"
    });
    return this.http.post(environment.api_url + "token",data,{headers:reqHeader})
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token")
    return  token  !==  null;
}

getEmitter() {
    return this.fireIsLoggedIn;
  }

 public emit(username){
   this.fireIsLoggedIn.emit(username);
 }

logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  this.router.navigate(["/"])
  }
  isSeller():boolean{
    const role = localStorage.getItem("role");
    return role !== "Customer";
  }
}
