import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { Bike } from 'src/app/models/Bike';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  bikes : Bike[];
  constructor(private bikeService:BikeService) {
    this.bikeService.getBikesOfASeller().subscribe(response=>{
        this.bikes = response;
        console.log("bikes",this.bikes);
    })
   }

  ngOnInit() {
  }

  deleteBike(id){
    if(confirm("Do you want to delete ?")){
      console.log("deleted",id);
      this.bikeService.deleteBike(id).subscribe(response=>{
        this.bikeService.getBikesOfASeller().subscribe(response=>{
          this.bikes = response;
          console.log("bikes",this.bikes);
      })
    })
  }
}

}
