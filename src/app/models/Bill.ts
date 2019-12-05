import { Rental } from './Rental';

export interface Bill{
    id?:number,
    rentalId:number,
    rental:Rental,
    firstHourCharges:number,
    additionalCharges:number
}