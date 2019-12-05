import { Component, OnInit } from '@angular/core';
import { RentalService } from '../services/rental.service';
import { Rental } from '../models/Rental';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.css']
})
export class MyRentalsComponent implements OnInit {
  currentOrientation = "horizontal";
  allRentals : Rental[];
  activeRentals : Rental[];
  endedRentals : Rental [];
  scheduledRentals : Rental[];
  selectedRental : Rental;
  rentalToEndId: number;
  constructor(private rentalService:RentalService,private config: NgbTabsetConfig,
    public confirmDialogService:ConfirmDialogService,private router:Router) {
    config.justify = 'center';
    config.type = 'pills'; 
      this.rentalService.getAllRentalsForAPerson().subscribe(response=>{
        this.allRentals = response;
        console.log("my rentals",this.allRentals);
        this.activeRentals = this.allRentals.filter(r=>r.isActive == true);
        console.log("active",this.activeRentals);
        this.endedRentals = this.allRentals.filter(r=>r.isActive == false);
        console.log("ended",this.endedRentals);
      });
    
  }

  ngOnInit() {
  }

  checkIFActiveOrNot(rental){
      return rental.isActive;
  }

  openConfirmationDialog(id){
    $("#myModal3").modal('show');
    this.rentalToEndId = id;
 //   console.log("rentId",id);
  }
  endRental(){
    console.log("end",this.rentalToEndId);
    var rentalSelected = this.allRentals.find((r)=>r.id === this.rentalToEndId);
    console.log("sel",rentalSelected);
    this.rentalService.endARental(this.rentalToEndId,rentalSelected).subscribe(response=>{
      this.selectedRental = response;
      console.log(this.selectedRental);
      this.router.navigate(["/rental/bill/",this.selectedRental.id]);
    })
  
  }

  //   this.confirmDialogService.confirm(
  //     "End Rental",
  //     "Do you really want to end the trip ?",
  //     "Yes",
  //     "No",
  //     "lg")
  //   .then(confirmed => {
  //     if (confirmed) {
        
  //     }
  //   })
  //   .catch(() =>
  //     console.log(
  //       "User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"
  //     )
  //   );
  // }
  
}
