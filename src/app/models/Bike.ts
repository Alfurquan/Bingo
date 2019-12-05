import { Seller } from './Seller';
import { Category } from './Category';

export interface Bike{
    id?:number,
    image:string,
    model:string,
    seller?:Seller,
    sellerId?:number,
    username:string,
    vehicleNumber:string,
    status?:number,
    categoryId:number,
    rentalPriceForFirstHour:number,
    rentalPriceForAdditionalHours:number,
    dateOfPurchase:Date,
    noInStock:number,
    latitude? : string,
    longitude? : string,
    dateOfLastService:Date
}