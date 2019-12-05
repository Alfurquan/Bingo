import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../utility/notification.service';

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.css']
})
export class StoreLocationComponent implements OnInit {

  public lat : number
  public lng : number
  public searchControl: FormControl;
  public zoom: number;
  private user : User;
  
  @ViewChild("search",{static:true})
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private router:Router,private authService:AuthService,private notifyService:NotificationService) { }

  ngOnInit() {
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        console.log("lat",this.lat);
        console.log("lng",this.lng);
      });
    }
    if(localStorage.getItem("user")!=null){
       this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
    }
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      })
    })
  }

  onChooseLocation(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  save(){
    if(localStorage.getItem("user")!=null){
      this.user.latitude = this.lat.toString();
      this.user.longitude = this.lng.toString();
      this.authService.registerUser(this.user).subscribe(response=>{
        console.log("success");
        this.notifyService.showSuccess("Successfully registered,login to continue","Success");
        this.router.navigate(["/login"])
      })
    }else{
      localStorage.setItem("lat",this.lat.toString());
      localStorage.setItem("lng",this.lng.toString());
      this.router.navigate(["/register"])
    }   
  }

}
