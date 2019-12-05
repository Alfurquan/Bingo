import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { Router } from '@angular/router';
import { Bike } from 'src/app/models/Bike';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrls: ['./add-bike.component.css']
})
export class AddBikeComponent implements OnInit {
  bike : Bike;
  categories : Category[];
  constructor(private bikeService:BikeService,private router:Router) { 
    this.bike = {
      model :"",
      vehicleNumber:"",
      image:"",
      username:"",
      noInStock:0,
      rentalPriceForAdditionalHours:0,
      rentalPriceForFirstHour:0,
      dateOfPurchase:new Date(),
      dateOfLastService:new Date(),
      categoryId:0
    }
  }

  ngOnInit() {
    this.bikeService.getAllCategories().subscribe(response=>{
      this.categories = response;
      console.log("categories",this.categories);
    })
  }

  save(bike){

      var dateOfPurchase = new Date(bike.dateOfPurchase.year + "-" + bike.dateOfPurchase.month + "-" + bike.dateOfPurchase.day+" 00:00:00")
      var dateOfLastService = new Date(bike.dateOfLastService.year + "-" + bike.dateOfLastService.month + "-" + bike.dateOfLastService.day+" 00:00:00")
      this.bike.image = bike.image;
      this.bike.model = bike.model;
      this.bike.noInStock = bike.noInStock;
      this.bike.vehicleNumber = bike.vehicleNumber;
      this.bike.username = localStorage.getItem("username");
      this.bike.categoryId = bike.categoryId,
      this.bike.rentalPriceForFirstHour = bike.rentalPriceForFirstHour,
      this.bike.rentalPriceForAdditionalHours = bike.rentalPriceForAdditionalHours,
      this.bike.dateOfPurchase = dateOfPurchase,
      this.bike.dateOfLastService = dateOfLastService
      console.log("bike",this.bike); 
      this.bikeService.createBike(this.bike).subscribe(response=>{
        console.log("resp",response);
        this.router.navigate(["/bikes"]);
      })
  }

}
