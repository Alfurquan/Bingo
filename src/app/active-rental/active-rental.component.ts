import { Component, OnInit } from '@angular/core';
import { RentalService } from '../services/rental.service';
import { Rental } from '../models/Rental';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-active-rental',
  templateUrl: './active-rental.component.html',
  styleUrls: ['./active-rental.component.css']
})
export class ActiveRentalComponent implements OnInit {

  activeRentals : Rental[];
  rentalToEndId : number;
  selectedRental : Rental;
  constructor(private rentalService:RentalService,private router:Router) {
    this.rentalService.getAllActiveRentalsForAPerson().subscribe(response=>{
      this.activeRentals = response;
      console.log("act",this.activeRentals);
    })
   }

  ngOnInit() {
  }

  openConfirmationDialog(id){
    $("#myModal2").modal('show');
    this.rentalToEndId = id;
 //   console.log("rentId",id);
  }

  endRental(){
    console.log("end",this.rentalToEndId);
    var rentalSelected = this.activeRentals.find((r)=>r.id === this.rentalToEndId);
    console.log("sel",rentalSelected);
    this.rentalService.endARental(this.rentalToEndId,rentalSelected).subscribe(response=>{
      this.selectedRental = response;
      console.log(this.selectedRental);
      this.router.navigate(["/rental/bill/",this.selectedRental.id]);
    })
  }

}
