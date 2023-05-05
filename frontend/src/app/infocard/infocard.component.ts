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

  // Lifecycle hook called after the component is initialized
  ngOnInit() {
    // Subscribe to the nameUpdate event from the AlertService
    this.infocardsService.nameUpdate.subscribe(
      // Callback function to handle the event
      (name: string) => {
        // Update the errorMessage variable
        this.driverName = name;
      }
    );
    // Subscribe to the locationUpdate event from the AlertService
    this.infocardsService.locationUpdate.subscribe(
      // Callback function to handle the event
      (location: string) => {
        // Update the errorMessage variable
        this.driverLocation = location;
      }
    );
    // Subscribe to the statusUpdate event from the AlertService
    this.infocardsService.statusUpdate.subscribe(
      // Callback function to handle the event
      (status: string) => {
        // Update the errorMessage variable
        this.driverStatus = status;
      }
    );
    // Subscribe to the clearingTimeUpdate event from the AlertService
    this.infocardsService.clearingTimeUpdate.subscribe(
      // Callback function to handle the event
      (clearingTime: string) => {
        // Update the errorMessage variable
        this.driverClearingTime = clearingTime;
      }
    );
    // Subscribe to the rideUpdate event from the AlertService
    this.infocardsService.rideUpdate.subscribe(
      // Callback function to handle the event
      (ride: string) => {
        // Update the errorMessage variable
        this.driverRide = ride;
      }
    );
    // Subscribe to the trailerVINUpdate event from the AlertService
    this.infocardsService.trailerVINUpdate.subscribe(
      // Callback function to handle the event
      (trailerVIN: string) => {
        // Update the errorMessage variable
        this.trailerVIN = trailerVIN;
      }
    );
    // Subscribe to the truckVINUpdate event from the AlertService
    this.infocardsService.truckVINUpdate.subscribe(
      // Callback function to handle the event
      (truckVIN: string) => {
        // Update the errorMessage variable
        this.truckVIN = truckVIN;
      }
    );
  }


}
