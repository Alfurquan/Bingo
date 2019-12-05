import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../services/rental.service';
import { Rental } from '../models/Rental';
import { Bill } from '../models/Bill';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-rent-billing',
  templateUrl: './rent-billing.component.html',
  styleUrls: ['./rent-billing.component.css']
})
export class RentBillingComponent implements OnInit {

  rentalId : string;
  rental : Rental;
  bill : Bill;
  constructor(private route:ActivatedRoute,private rentalService:RentalService,private router:Router) {
    this.rentalId = this.route.snapshot.paramMap.get("id");
    this.rentalService.getRental(this.rentalId).subscribe(response=>{
      this.rental = response;
      console.log("bill",this.rental);
    })
    this.rentalService.getBillForARental(this.rentalId).subscribe(response=>{
      this.bill = response;
      console.log("bills",this.bill);
    })
   }

  ngOnInit() {
  }

  generateInvoice(){
    this.rentalService.getFile(this.rentalId).subscribe(fileData => 
      {
      let b:any = new Blob([fileData], { type: 'application/pdf' });
      // var url= window.URL.createObjectURL(b);
      //   window.open(url);
      saveAs(b,"Invoice.pdf");

      })
  }

  goToBikes(){
    this.router.navigate(["/bikes"]);
  }

}
