import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import {HttpClientModule, HttpClient} from '@angular/common/http';  
import { HeaderComponent } from './header-component/header-component.component';
import { SignUpComponent } from './sign-up-component/sign-up-component.component';
import { LoginComponent } from './login-component/login-component.component';
import { ShowbikesComponent } from './showbikes/showbikes.component';
import { BikesComponent } from './seller/bikes/bikes.component';
import { EditBikeComponent } from './seller/edit-bike/edit-bike.component';
import { AddBikeComponent } from './seller/add-bike/add-bike.component';
import { BikeDetailsComponent } from './bike-details/bike-details.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmEqualValidatorDirective } from '../validators/confirm-equal-validator.directive';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreLocationComponent } from './store-location/store-location.component';
import { RentalConfirmComponent } from './rental-confirm/rental-confirm.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MyRentalsComponent } from './my-rentals/my-rentals.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { ActiveRentalComponent } from './active-rental/active-rental.component';
import { RentBillingComponent } from './rent-billing/rent-billing.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    LoginComponent,
    ShowbikesComponent,
    BikesComponent,
    EditBikeComponent,
    AddBikeComponent,
    BikeDetailsComponent,
    StoreLocationComponent,
    RentalConfirmComponent,
    ConfirmDialogComponent,
    MyRentalsComponent,
    RentalDetailsComponent,
    ActiveRentalComponent,
    RentBillingComponent,
    ConfirmEqualValidatorDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AngularDateTimePickerModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCjd0XHsg4Xmy7pWnGY9Hf5gx1P7i_Si3Q',
      libraries : ["places"]
    }),
    RouterModule.forRoot([
      { path:"",component:HomeComponent},
      { path:"register",component:SignUpComponent },
      { path:"login",component:LoginComponent },
      { path:"location",component:StoreLocationComponent },
      { path:"bikes",component:ShowbikesComponent },
      { path:"rental/confirm/:id",component:RentalConfirmComponent,canActivate:[AuthGuardService] },
      { path:"my/rentals",component:MyRentalsComponent,canActivate:[AuthGuardService] },
      { path:"active/rentals",component:ActiveRentalComponent ,canActivate:[AuthGuardService]},
      { path:"rentals/:id",component:RentalDetailsComponent },
      { path:"seller/bikes",component:BikesComponent,canActivate:[AuthGuardService]},
      { path:"bike/:id",component:BikeDetailsComponent },
      { path:"seller/edit/:id",component:EditBikeComponent,canActivate:[AuthGuardService] },
      { path:"rental/bill/:id",component:RentBillingComponent ,canActivate:[AuthGuardService]},
      { path:"seller/add",component:AddBikeComponent,canActivate:[AuthGuardService] }
    ])
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [DatePipe,AuthGuardService],
  bootstrap: [AppComponent],

})
export class AppModule { }
