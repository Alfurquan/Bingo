import { Component, OnInit } from '@angular/core';
import { BikeService } from '../services/bike.service';
import { Bike } from '../models/Bike';
import { BikeLocation } from '../models/BikeLocation';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-showbikes',
  templateUrl: './showbikes.component.html',
  styleUrls: ['./showbikes.component.css']
})
export class ShowbikesComponent implements OnInit {
   bikes:Bike[]
   bikeLoc : BikeLocation[];
   selectedBikes : Bike[];
  constructor(private bikeService:BikeService,private router:Router) { 
    this.bikeService.getAllBikes().subscribe(response=>{
        this.bikes = response;
        console.log("bikes",this.bikes);
        this.bikeLoc = this.bikes.map(bike=>{
          return {id : bike.id,latitude:+bike.latitude,longitude:+bike.longitude,sellerId:bike.sellerId}
        })
        console.log("loc",this.bikeLoc);
    })
    
  }

  ngOnInit() {
  }

  checkIfOneBike(){
    if(this.selectedBikes){
      if(this.selectedBikes.length > 1){
        return true;
      }
      return false;
    }
  }

  click(sellerId){
    console.log("clicked",sellerId);
    this.bikeService.getBikesOfASellerByID(sellerId).subscribe(response=>{
      this.selectedBikes = response;
      console.log("bikes",this.selectedBikes);
    })
    $("#myModal1").modal('show');
  }

  show(id){
    this.router.navigate(["/bike",id]);
    $("#myModal1").modal('hide');

  }

}
