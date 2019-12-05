import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Bike } from '../models/Bike';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http:HttpClient) { }


  getAllBikes():Observable<Bike[]>{
    return this.http.get<Bike[]>(environment.api_url + "api/bikes");
  }

  getBikesOfASeller():Observable<Bike[]>{
    var email:string = localStorage.getItem("username")
    console.log("email",email);
    var json = JSON.parse('{"email":"'+ email + '"}');
    return this.http.post<Bike[]>(environment.api_url + "seller/bike",json);
  }

  getBike(id):Observable<Bike>{
    return this.http.get<Bike>(environment.api_url + "api/bikes/" + id)
  }

  editBike(id,bike){
    return this.http.put(environment.api_url + "api/bikes/" + id,bike);
  }

  createBike(bike){
    console.log("bikeSer",bike);
    return this.http.post(environment.api_url + "api/bikes",bike);
  }

  deleteBike(id){
    return this.http.delete(environment.api_url + "api/bikes/" + id);
  }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(environment.api_url + "api/categories");
  }

  getBikesOfASellerByID(sellerId):Observable<Bike[]>{
    return this.http.get<Bike[]>(environment.api_url + "seller/bike/" + sellerId);

  }
}
