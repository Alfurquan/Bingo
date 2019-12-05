import { Customer } from './Customer';
import { Bike } from './Bike';
import { Seller } from './Seller';

export interface Rental{
    id?:number,
    username:string,
    customerId?:number,
    customer?:Customer,
    bikeId:number,
    bike?:Bike,
    sellerId:number,
    seller?:Seller
    rentalBegin:Date,
    rentalEnd?:Date,
    totalCost?:number,
    isActive:boolean 
}