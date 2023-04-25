import { Component, OnInit } from '@angular/core';
import {AllDriverPositionsService} from "../all-driver-positions.service";

@Component({
  selector: 'app-all-driver-positions',
  templateUrl: './all-driver-positions.component.html',
  styleUrls: ['./all-driver-positions.component.css']
})


export class AllDriverPositionsComponent implements OnInit{
  showingAllDrivers:boolean = false;

  constructor(private allDriverPositionsService: AllDriverPositionsService) {
  }

  ngOnInit() {
    this.showingAllDrivers = true;
    this.allDriverPositionsService.updateShowingAllDrivers(this.showingAllDrivers);
  }

}
