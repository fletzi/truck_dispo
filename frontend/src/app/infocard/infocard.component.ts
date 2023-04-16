import { Component, OnInit } from '@angular/core';
import {InfocardsService} from "../infocards.service";

@Component({
  selector: 'app-infocard',
  templateUrl: './infocard.component.html',
  styleUrls: ['./infocard.component.css']
})
export class InfocardComponent implements OnInit{
  driverName: string = "Driver Name";
  driverLocation: string = "Location";
  driverStatus: string = "unknown";
  driverClearingTime: string = "unknown";
  truckVIN: string = "unknown";
  driverRide: string = "unknown";
  trailerVIN: string = "unknown";

  constructor(private infocardsService: InfocardsService) { }

  ngOnInit() {
    // Subscribe to the messageUpdate event from the AlertService
    this.infocardsService.nameUpdate.subscribe(
      // Callback function to handle the event
      (name: string) => {
        // Update the errorMessage variable
        this.driverName = name;
      }
    );
    this.infocardsService.locationUpdate.subscribe(
      // Callback function to handle the event
      (location: string) => {
        // Update the errorMessage variable
        this.driverLocation = location;
      }
    );
    this.infocardsService.statusUpdate.subscribe(
      // Callback function to handle the event
      (status: string) => {
        // Update the errorMessage variable
        this.driverStatus = status;
      }
    );
    this.infocardsService.clearingTimeUpdate.subscribe(
      // Callback function to handle the event
      (clearingTime: string) => {
        // Update the errorMessage variable
        this.driverClearingTime = clearingTime;
      }
    );
    this.infocardsService.rideUpdate.subscribe(
      // Callback function to handle the event
      (ride: string) => {
        // Update the errorMessage variable
        this.driverRide = ride;
      }
    );
    this.infocardsService.trailerVINUpdate.subscribe(
      // Callback function to handle the event
      (trailerVIN: string) => {
        // Update the errorMessage variable
        this.trailerVIN = trailerVIN;
      }
    );
    this.infocardsService.truckVINUpdate.subscribe(
      // Callback function to handle the event
      (truckVIN: string) => {
        // Update the errorMessage variable
        this.truckVIN = truckVIN;
      }
    );
  }


}
