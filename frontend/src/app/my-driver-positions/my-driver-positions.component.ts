import { Component, OnInit } from '@angular/core';
import { AllDriverPositionsService } from '../all-driver-positions.service';

@Component({
  selector: 'app-my-driver-positions',
  templateUrl: './my-driver-positions.component.html',
  styleUrls: ['./my-driver-positions.component.css']
})

export class MyDriverPositionsComponent implements OnInit {
  showingAllDrivers: boolean = false; // Indicates whether all drivers are being shown or not.

  constructor(private allDriverPositionsService: AllDriverPositionsService) {
    // Injects the AllDriverPositionsService to retrieve and manipulate driver positions data.
  }

  ngOnInit() {
    // Called after the component is initialized. Initializes the showingAllDrivers flag to false and updates the service with this value.
    this.showingAllDrivers = false;
    this.allDriverPositionsService.updateShowingAllDrivers(this.showingAllDrivers);
  }

}

