import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeService } from '../services/bike.service';
import { Bike } from '../models/Bike';
import { DatePicker } from 'angular2-datetimepicker';
import * as $ from 'jquery';
import { Rental } from '../models/Rental';
import { RentalService } from '../services/rental.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../utility/notification.service';
@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.css']
})
export class BikeDetailsComponent implements OnInit {
  bike : Bike;
  id : string;
  rental : Rental;
  date : Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy:hh:mm:ss',
    defaultOpen: false,
    closeOnSelect: true
}
  constructor(private route:ActivatedRoute,
    private router:Router,
    private bikeService:BikeService,
    private rentalService:RentalService,
    private authService:AuthService,
    private notifyService:NotificationService) {

    DatePicker.prototype.ngOnInit = function() {
      this.settings = Object.assign(this.defaultSettings, this.settings);
      if (this.settings.defaultOpen) {
      this.popover = true;
      }
      this.date = new Date();
      };
      this.rental = {
        rentalBegin : new Date(),
        username : localStorage.getItem('username'),
        sellerId : 0,
        bikeId : 0,
        isActive: true
      }
      this.id = this.route.snapshot.paramMap.get("id");
      console.log(this.id);
      this.bikeService.getBike(this.id).subscribe(response=>{
      this.bike = response;
      this.bike.dateOfPurchase = new Date(this.bike.dateOfPurchase);
      this.bike.dateOfLastService = new Date(this.bike.dateOfLastService);
      console.log("bike",this.bike);

     
      $(document).ready(function(){
        $("#scheduleForLater").click(function(){
          console.log("clicked");
          $("#form").fadeToggle("slow");
         
        })
      })
    })
   }

  ngOnInit() {
  }

  startRent(rental){
    console.log(this.date);
    this.rental.sellerId = this.bike.sellerId;
    this.rental.bikeId = this.bike.id;
    this.rental.rentalBegin = rental.dateAndTime;
    if(this.rental.rentalBegin > new Date()){
      console.log("true");
    }
    console.log("rental",this.rental);
    // this.rentalService.addRental(this.rental).subscribe(response=>{
    //   console.log(response);
    //  })

  }
  startNow(){
    this.rental.sellerId = this.bike.sellerId;
    this.rental.bikeId = this.bike.id;
    this.rental.rentalBegin = new Date();
    console.log("rental",this.rental);
    if(!this.authService.isLoggedIn()){
        this.notifyService.showError("Login to continue","Login");
        this.router.navigate(["/login"])
    }else{
      this.rentalService.addRental(this.rental).subscribe(response=>{
        console.log(response);
        this.router.navigate(['/rental/confirm/',response.id])
      })
    }  
  }

}
