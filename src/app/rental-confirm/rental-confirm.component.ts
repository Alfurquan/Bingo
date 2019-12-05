import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from '../models/Rental';
import { RentalService } from '../services/rental.service';
import { ConfirmDialogService } from '../services/confirm-dialog.service';

@Component({
  selector: 'app-rental-confirm',
  templateUrl: './rental-confirm.component.html',
  styleUrls: ['./rental-confirm.component.css']
})
export class RentalConfirmComponent implements OnInit {
  id : string;
  rental : Rental;

  constructor(private route:ActivatedRoute,private router:Router,
    private rentalService:RentalService,public confirmDialogService:ConfirmDialogService) {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.rentalService.getRental(this.id).subscribe(response=>{
      this.rental = response;
      console.log("rental",this.rental);
    })
   }

  ngOnInit() {
  }

  confirmRental(){
    this.rentalService.addRental(this.rental).subscribe(response=>{
      console.log("resp",response);
      this.router.navigate(["/bikes"]);
    })
  }

  public openConfirmationDialog() {
    this.confirmDialogService.confirm(
        "Cancel Rental",
        "Do you really want to cancel the trip ?",
        "Yes",
        "No",
        "lg")
      .then(confirmed => {
        if (confirmed) {
          this.rentalService.deleteRental(this.id).subscribe(response=>{
            this.router.navigate(["/bikes"]);
          })
        }
      })
      .catch(() =>
        console.log(
          "User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"
        )
      );
  }

  cancelRental(){
    
  }

}
