import { Injectable } from '@angular/core';
import { InfocardComponent } from './infocard/infocard.component';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfocardsService {

  name: string = "";
  location: string = "";
  status: string = "";
  clearingTime: string = "";
  truckVIN: string = "";
  ride: string = "";
  trailerVIN: string = "";

  nameUpdate = new Subject<string>()
  locationUpdate = new Subject<string>()
  statusUpdate = new Subject<string>()
  clearingTimeUpdate = new Subject<string>()
  truckVINUpdate = new Subject<string>()
  rideUpdate = new Subject<string>()
  trailerVINUpdate = new Subject<string>()

  constructor() { }

  /**
   * This function sets the details of a truck ride including name, location, status, clearing time, truck VIN, ride, and
   * trailer VIN.
   * @param {string} name - A string representing the name of a person or entity.
   * @param {string} location - string - represents the current location of a truck and trailer
   * @param {string} status - string variable that represents the current status of a truck or trailer. It could be
   * "available", "on the way", "loading", "unloading", "in transit", "maintenance", etc.
   * @param {string} clearingTime - clearingTime is a string parameter that represents the time it takes to clear a certain
   * task or activity. It is being updated using the clearingTimeUpdate.next() method.
   * @param {string} truckVIN - truckVIN is a string parameter that represents the Vehicle Identification Number (VIN) of a
   * truck. It is used to set the truck's VIN in the object's properties and emit an update event using the truckVINUpdate
   * subject.
   * @param {string} ride - The "ride" parameter is likely referring to a specific transportation job or assignment that
   * the vehicle is being used for. It could include details such as the destination, cargo being transported, and any
   * specific instructions or requirements for the job.
   * @param {string} trailerVIN - trailerVIN is a string parameter that represents the Vehicle Identification Number (VIN)
   * of the trailer. It is being set in the setDetails() method of an object, along with other parameters such as name,
   * location, status, clearingTime, truckVIN, and ride. The method updates the values
   */
  public setDetails(name: string, location: string, status: string, clearingTime: string, truckVIN: string,ride: string, trailerVIN: string) {

    this.name = name;
    this.nameUpdate.next(this.name);

    this.location = location;
    this.locationUpdate.next(this.location);

    this.status = status;
    this.statusUpdate.next(this.status);

    this.clearingTime = clearingTime;
    this.clearingTimeUpdate.next(this.clearingTime);

    this.truckVIN = truckVIN;
    this.truckVINUpdate.next(this.truckVIN);

    this.ride = ride;
    this.rideUpdate.next(this.ride);

    this.trailerVIN = trailerVIN;
    this.trailerVINUpdate.next(this.trailerVIN);
  }

}
