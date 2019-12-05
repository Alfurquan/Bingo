import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Bike } from 'src/app/models/Bike';
import { BikeService } from 'src/app/services/bike.service';
import { Category } from 'src/app/models/Category';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.css']
})
export class EditBikeComponent implements OnInit {

  id:string;
  bike : Bike;
  categories:Category[]
  constructor(private router:Router,private route:ActivatedRoute,private bikeService:BikeService,private datePipe:DatePipe) { 
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("id",this.id);
    this.bikeService.getBike(this.id).subscribe(response=>{
      this.bike = response;
      this.bike.dateOfPurchase = new Date(response.dateOfPurchase);
      console.log("d1",datePipe.transform(this.bike.dateOfPurchase,'yyyy-MM-dd'));
      this.bike.dateOfLastService = new Date(response.dateOfLastService);
      console.log("bike",this.bike);
    })
    this.bikeService.getAllCategories().subscribe(response=>{
      this.categories = response;
    })
  }

  ngOnInit() {
  }
  
  InStockOrRented(){
        return this.bike.status ==0
  }

  edit(bike){
    
    console.log("edit",bike);
    var datePurchase = (document.getElementById("dateOfPurchase") as HTMLInputElement).value;
    console.log("dt",datePurchase);
    var dateLastService = (document.getElementById("dateOfLastService") as HTMLInputElement).value;
    console.log("dt1",dateLastService);
    var dateOfPurchase = new Date(datePurchase + " 00:00:00");
    var dateOfLastService = new Date(dateLastService + " 00:00:00");
    bike.dateOfPurchase = dateOfPurchase;
    bike.dateOfLastService = dateOfLastService;
    console.log("bikeSent",bike);
    this.bikeService.editBike(this.id,bike).subscribe(response=>{
     this.router.navigate(["/seller/bikes"]);
    })
  }
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
}

}
