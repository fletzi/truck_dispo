import {Component, OnInit} from '@angular/core';
import {AllDriverPositionsService} from "../all-driver-positions.service";

@Component({
  selector: 'app-all-driver-positions',
  templateUrl: './all-driver-positions.component.html',
  styleUrls: ['./all-driver-positions.component.css']
})
// Define the AllDriverPositionsComponent
export class AllDriverPositionsComponent implements OnInit {

  // Variable to store whether all drivers are being shown or not
  showingAllDrivers: boolean = false;

  constructor(private allDriverPositionsService: AllDriverPositionsService) {
  }

  // Lifecycle hook called after the component is initialized
  ngOnInit() {
    // Set the showingAllDrivers variable to true
    this.showingAllDrivers = true;
    // Update the showingAllDrivers variable in the service
    this.allDriverPositionsService.updateShowingAllDrivers(this.showingAllDrivers);
  }

}
