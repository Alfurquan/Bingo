import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { Rental } from '../models/Rental';
import { Bill } from '../models/Bill';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http:HttpClient) { }

  addRental(rental):Observable<Rental>{
    return this.http.post<Rental>(environment.api_url + "api/rentals",rental);
  }

  getRental(id:any):Observable<Rental>{
    return this.http.get<Rental>(environment.api_url + "api/rentals/" + id); 
  }

  deleteRental(id){
    return this.http.delete(environment.api_url + "api/rentals/" + id);
  }

  getAllRentalsForAPerson():Observable<Rental[]>{
    var email:string = localStorage.getItem("username")
    console.log("email",email);
    var json = JSON.parse('{"email":"'+ email + '"}');
    return this.http.post<Rental[]>(environment.api_url + "rentals/all",json);
  }

  getAllActiveRentalsForAPerson():Observable<Rental[]>{
    var email:string = localStorage.getItem("username")
    console.log("email",email);
    var json = JSON.parse('{"email":"'+ email + '"}');
    return this.http.post<Rental[]>(environment.api_url + "active/rentals",json);
  }


  endARental(id,rental):Observable<Rental>{
    return this.http.put<Rental>(environment.api_url + "api/rentals/" + id,rental);
  }

  getBillForARental(id):Observable<Bill>{
    return this.http.get<Bill>(environment.api_url + "api/bills/" + id);
  }

  getFile(rentalId):Observable<any>{
    return this.http.get(environment.api_url + "download/bills/" + rentalId, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'blob'}).pipe (
    tap (
        // Log the result or error
        data => console.log('You received data'),
        error => console.log(error)
     )
   );
  }
}
