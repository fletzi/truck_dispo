import {Component, OnInit} from '@angular/core';
import { AlertService } from "../alert.service";
import {AllDriverPositionsService} from "../all-driver-positions.service";

@Component({
  selector: 'app-my-driver-positions',
  templateUrl: './my-driver-positions.component.html',
  styleUrls: ['./my-driver-positions.component.css']
})


export class MyDriverPositionsComponent implements OnInit{
  showingAllDrivers:boolean = false;

  constructor(private allDriverPositionsService: AllDriverPositionsService) {
  }

  ngOnInit() {
    this.showingAllDrivers = false;
    this.allDriverPositionsService.updateShowingAllDrivers(this.showingAllDrivers);
  }

}
