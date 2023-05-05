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

  // Initializes component upon creation
  ngOnInit(): void {
    // Calculate the date of the Monday of the currently selected week
    // If Sunday is selected, subtract 6 days to get Monday of the same week
    // Store the formatted date of the Monday
    // Update the table service with the selected Monday
    this.selectedWeekDateEarly.setDate(this.selectedWeekDateEarly.getDate() - (this.selectedWeekDateEarly.getDay() || 7) + 1);
    this.selectedWeekDateFormatted = format(this.selectedWeekDateEarly, 'MM / dd / yy');
    this.selectedWeekDate = this.selectedWeekDateEarly;
    this.tableService.updateSelectedMonday(this.selectedWeekDate);

    // Subscribe to the showingAllDrivers observable to update the view when the user toggles between viewing all drivers and assigned drivers
    this.allDriverPositionsService.showingAllDrivers$.subscribe(showingAllDrivers => {
      this.showingAllDrivers = showingAllDrivers;
    });

    // If showing all drivers, display the dispatcher button
    if (this.showingAllDrivers) {
      this.displayDispatcherBtn = true;
    }
  }

// Resets the search input field and updates the table service's search string to an empty string
  clearInput() {
    setTimeout(() => {
      this.searchForm.reset();
      this.tableService.updateSearchString("");
    }, 1010);
  }

// Navigates to the previous week by updating the selected week date to the previous Monday
// Updates the formatted date of the selected Monday
// Updates the table service with the selected Monday
  goToPreviousWeek() {
    const previousWeekDate = new Date(this.selectedWeekDate.getTime() - this.weekInMs);
    this.selectedWeekDate.setTime(previousWeekDate.getTime());
    this.selectedWeekDateFormatted = format(this.selectedWeekDate, 'MM / dd / yy');
    this.tableService.updateSelectedMonday(this.selectedWeekDate);
  }

// Navigates to the next week by updating the selected week date to the following Monday
// Updates the formatted date of the selected Monday
// Updates the table service with the selected Monday
  goToNextWeek() {
    const nextWeekDate = new Date(this.selectedWeekDate.getTime() + this.weekInMs);
    this.selectedWeekDate.setTime(nextWeekDate.getTime());
    this.selectedWeekDateFormatted = format(this.selectedWeekDate, 'MM / dd / yy');
    this.tableService.updateSelectedMonday(this.selectedWeekDate);
  }


}
