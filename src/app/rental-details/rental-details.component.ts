import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../services/rental.service';
import { Rental } from '../models/Rental';


@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css']
})
export class RentalDetailsComponent implements OnInit {

  rentalId : string;
  rental : Rental;
  constructor(private route:ActivatedRoute,private rentalService:RentalService) { 

    this.rentalId = this.route.snapshot.paramMap.get("id");
    this.rentalService.getRental(this.rentalId).subscribe(response=>{
      this.rental = response;
      console.log("rental",this.rental);
    })
 }

  ngOnInit() {
  }

  

}
