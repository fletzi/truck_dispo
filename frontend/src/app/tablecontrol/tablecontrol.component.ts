import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {format} from "date-fns";
import {TableService} from "../table.service"
import {AllDriverPositionsService} from "../all-driver-positions.service";

@Component({
  selector: 'app-tablecontrol',
  templateUrl: './tablecontrol.component.html',
  styleUrls: ['./tablecontrol.component.css']
})
export class TablecontrolComponent implements OnInit {

  constructor(public tableService: TableService, private allDriverPositionsService: AllDriverPositionsService) { }

  // @ts-ignore
  @ViewChild('searchForm', {static: false}) searchForm: NgForm;
  showDriverName: boolean = true;
  showEdit: boolean = true;
  showDispatcher: boolean = true;
  displayDispatcherBtn: boolean = false;

  showMonday: boolean = true;
  showTuesday: boolean = true;
  showWednesday: boolean = true;
  showThursday: boolean = true;
  showFriday: boolean = true;
  showSaturday: boolean = true;
  showSunday: boolean = true;
  showMondayNW: boolean = true;

  showingAllDrivers:boolean = false;

  // @ts-ignore
  searchString: string;
  // @ts-ignore
  selectedWeekDate: Date;
  selectedWeekDateEarly: Date = new Date;
  selectedWeekDateFormatted: string = "";
  weekInMs = 7 * 24 * 60 * 60 * 1000; // number of milliseconds in a week

  ngOnInit(): void {
    this.selectedWeekDateEarly.setDate(this.selectedWeekDateEarly.getDate() - (this.selectedWeekDateEarly.getDay() || 7) + 1);
    this.selectedWeekDateFormatted = format(this.selectedWeekDateEarly, 'MM / dd / yy');
    this.selectedWeekDate = this.selectedWeekDateEarly;
    this.tableService.updateSelectedMonday(this.selectedWeekDate);
    this.allDriverPositionsService.showingAllDrivers$.subscribe(showingAllDrivers => {
      this.showingAllDrivers = showingAllDrivers;
    });
    if (this.showingAllDrivers) {
      this.displayDispatcherBtn = true;
    }
  }

  clearInput() {
    setTimeout(() => {
      this.searchForm.reset();
      this.tableService.updateSearchString("");
    }, 1010);
  }

  goToPreviousWeek() {
    const previousWeekDate = new Date(this.selectedWeekDate.getTime() - this.weekInMs);
    this.selectedWeekDate.setTime(previousWeekDate.getTime());
    this.selectedWeekDateFormatted = format(this.selectedWeekDate, 'MM / dd / yy');
    this.tableService.updateSelectedMonday(this.selectedWeekDate);
  }

  goToNextWeek() {
    const previousWeekDate = new Date(this.selectedWeekDate.getTime() + this.weekInMs);
    this.selectedWeekDate.setTime(previousWeekDate.getTime());
    this.selectedWeekDateFormatted = format(this.selectedWeekDate, 'MM / dd / yy');
    this.tableService.updateSelectedMonday(this.selectedWeekDate);
  }

}
