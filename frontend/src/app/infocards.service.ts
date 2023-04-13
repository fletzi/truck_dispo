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
