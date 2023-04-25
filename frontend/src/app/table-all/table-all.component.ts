import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatTableExporterDirective} from 'mat-table-exporter';
import {TableService} from "../table.service";
import {AlertService} from "../alert.service";
import {format} from "date-fns";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {EditDriverPositionService} from "../edit-driver-position.service";
import {ActivatedRoute, Router} from "@angular/router";


export interface Driver {
  dispatcher: {name: string, id: string};
  name: {id: string, name: string, trailerVIN: string, truckVIN: string};
  monday: {date: string, address1: string, status: string, id: bigint};
  tuesday: {date: string, address2: string, status: string, id: bigint};
  wednesday: {date: string, address3: string, status: string, id: bigint};
  thursday: {date: string, address4: string, status: string, id: bigint};
  friday: {date: string, address5: string, status: string, id: bigint};
  saturday: {date: string, address6: string, status: string, id: bigint};
  sunday: {date: string, address7: string, status: string, id: bigint};
  mondayNW: {date: string, address8: string, status: string, id: bigint};
}

let ELEMENT_DATA: Driver[] = [];


@Component({
  selector: 'app-table-all',
  templateUrl: './table-all.component.html',
  styleUrls: ['./table-all.component.css']
})

export class TableAllComponent {

  formattedDate:string = "";

  showDispatcher: boolean = true;
  showDriverName: boolean = true;
  showEdit: boolean = true;

  showMonday: boolean = true;
  showTuesday: boolean = true;
  showWednesday: boolean = true;
  showThursday: boolean = true;
  showFriday: boolean = true;
  showSaturday: boolean = true;
  showSunday: boolean = true;
  showMondayNW: boolean = true;

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // @ts-ignore
  @ViewChild(MatTable, {static: false}) table : MatTable<any>  // Initialize

  // @ts-ignore
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(private http: HttpClient, private tableControlService: TableService, private  alertService: AlertService, private editDriverPositionService: EditDriverPositionService, private router: Router, private route: ActivatedRoute) { }

  /**
   * The ngOnInit function subscribes to various table control service observables and updates the table view accordingly.
   */
  ngOnInit(): void {

    this.tableControlService.selectedMonday$.subscribe(selectedMonday => {
      this.formattedDate = format(selectedMonday, 'yyyy-MM-dd');
      this.getTableData().then(r => {
        this.dataSource = new MatTableDataSource<Driver>(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.updateHiddenColumns();
        this.updateView()
        this.table.renderRows();
      });
    });

    this.tableControlService.showDispatcher$.subscribe(showDispatcher => {
      console.log(this.showDispatcher);
      this.showDispatcher = showDispatcher;
      console.log(this.showDispatcher);
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showDriverName$.subscribe(showDriverName => {
      this.showDriverName = showDriverName;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showDriverName$.subscribe(showDriverName => {
      this.showDriverName = showDriverName;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showEdit$.subscribe(showEdit => {
      this.showEdit = showEdit;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showMonday$.subscribe(showMonday => {
      this.showMonday = showMonday;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showTuesday$.subscribe(showTuesday => {
      this.showTuesday = showTuesday;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showWednesday$.subscribe(showWednesday => {
      this.showWednesday = showWednesday;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showThursday$.subscribe(showThursday => {
      this.showThursday = showThursday;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showFriday$.subscribe(showFriday => {
      this.showFriday = showFriday;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showSaturday$.subscribe(showSaturday => {
      this.showSaturday = showSaturday;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showSunday$.subscribe(showSunday => {
      this.showSunday = showSunday;
      this.updateHiddenColumns();
      this.updateView()
    });

    this.tableControlService.showMondayNW$.subscribe(showMondayNW => {
      this.showMondayNW = showMondayNW;
      this.updateHiddenColumns();
      this.updateView()
    });

    setTimeout(() => {
      this.tableControlService.searchString$.subscribe(searchString => {
        this.filterTable(searchString);
      });
    }, 10000);
  }

  // @ts-ignore
  /**
   * This function retrieves data from an API and formats it into a table for display.
   */
  async getTableData() {
    this.dataSource = new MatTableDataSource<Driver>();
    // https://cors-anywhere.herokuapp.com/ - Proxy for dev purposes
    let url = `https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/dispo/getTableDataWeek/${this.formattedDate}`;
    let token = sessionStorage.getItem('jwt');
    try {
      const data: any = await this.http.get(url, {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + token,
            'Accept': '*/*',
            'Content-Type': 'application/json'
          }),}).toPromise();
      const newELEMENT_DATA: Driver[] = [];
      console.log(data);
      for (let driverData of data) {
        let driver: Driver = {
          dispatcher: {
            name: driverData.Dispatcher.name,
            id: driverData.Dispatcher.id,
          },
          name: {
            id: driverData.Driver.id,
            name: driverData.Driver.name,
            trailerVIN: driverData.Driver.TrailerVIN,
            truckVIN: driverData.Driver.TruckVIN
          },
          monday: {
            date: driverData.Week[0].date,
            address1: driverData.Week[0].address,
            status: driverData.Week[0].status,
            id: BigInt(driverData.Week[0].id)
          },
          tuesday: {
            date: driverData.Week[1].date,
            address2: driverData.Week[1].address,
            status: driverData.Week[1].status,
            id: BigInt(driverData.Week[1].id)
          },
          wednesday: {
            date: driverData.Week[2].date,
            address3: driverData.Week[2].address,
            status: driverData.Week[2].status,
            id: BigInt(driverData.Week[2].id)
          },
          thursday: {
            date: driverData.Week[3].date,
            address4: driverData.Week[3].address,
            status: driverData.Week[3].status,
            id: BigInt(driverData.Week[3].id)
          },
          friday: {
            date: driverData.Week[4].date,
            address5: driverData.Week[4].address,
            status: driverData.Week[4].status,
            id: BigInt(driverData.Week[4].id)
          },
          saturday: {
            date: driverData.Week[5].date,
            address6: driverData.Week[5].address,
            status: driverData.Week[5].status,
            id: BigInt(driverData.Week[5].id)
          },
          sunday: {
            date: driverData.Week[6].date,
            address7: driverData.Week[6].address,
            status: driverData.Week[6].status,
            id: BigInt(driverData.Week[6].id)
          },
          mondayNW: {
            date: driverData.Week[7].date,
            address8: driverData.Week[7].address,
            status: driverData.Week[7].status,
            id: BigInt(driverData.Week[7].id)
          }
        }
        newELEMENT_DATA.push(driver);
      }
      ELEMENT_DATA = newELEMENT_DATA
      if (data.length == 1) {
        this.alertService.setMessage(data.length + " driver dataset has been loaded.");
      }
      else {
        this.alertService.setMessage(data.length + " driver datasets have been loaded.");
      }
      this.alertService.setCode(200); // Hier setzen wir den errorCode auf den Standardwert 200 für eine erfolgreiche Anfrage
    } catch (error) {
      console.error('HTTP Request was not successful', error);
      // @ts-ignore
      if (error.status == 400) {
        this.alertService.setMessage("There are no driver datasets for the week you selected.");
      }
      else {
        // @ts-ignore
        this.alertService.setMessage(error.statusText + " - Error: " + error.status);
      }
      // @ts-ignore
      this.alertService.setCode(error.status);
    }
  }

  /**
   * This function filters a table based on a search string and displays an alert message if no results are found.
   * @param {string} searchString - The parameter `searchString` is a string that represents the search term entered by the
   * user to filter the data in a table. The function filters the data based on whether any of the values in the table
   * (converted to lowercase) contain the search term (also converted to lowercase).
   */
  filterTable(searchString: string) {
    // @ts-ignore
    this.alertService.setMessage(null);
    // @ts-ignore
    this.alertService.setCode(null);
    // @ts-ignore
    this.dataSource.filteredData = this.dataSource.data.filter((driver) =>
      Object.values(driver)
        .flatMap((obj) => Object.values(obj))
        .join("")
        .toLowerCase()
        .includes(searchString.toLowerCase())
    );
    if (this.dataSource.filteredData.length == 0) {
      this.alertService.setMessage("No table results could be found for this search term.");
      this.alertService.setCode(300);
    }
  }


  // @ts-ignore
  @ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;

  hiddenColumns: number[] = [];

  updateHiddenColumns() {
    this.hiddenColumns = [10];

    if (!this.showDispatcher) {
      this.hiddenColumns.push(0) // dispatcher name column index
    }

    if (!this.showDriverName) {
      this.hiddenColumns.push(1); // driver name column index
    }

    if (!this.showMonday) {
      this.hiddenColumns.push(2); // monday column index
    }

    if (!this.showTuesday) {
      this.hiddenColumns.push(3); // tuesday column index
    }

    if (!this.showWednesday) {
      this.hiddenColumns.push(4); // wednesday column index
    }

    if (!this.showThursday) {
      this.hiddenColumns.push(5); // thursday column index
    }

    if (!this.showFriday) {
      this.hiddenColumns.push(6); // friday column index
    }

    if (!this.showSaturday) {
      this.hiddenColumns.push(7); // saturday column index
    }

    if (!this.showSunday) {
      this.hiddenColumns.push(8); // sunday column index
    }

    if (!this.showMondayNW) {
      this.hiddenColumns.push(9); // mondayNW column index
    }

  }

  displayedColumns: string[] = ['dispatcher', 'name', 'address1', 'address2', 'address3', 'address4', 'address5', 'address6', 'address7', 'address8', 'edit'];

  updateView() {
    const displayedColumns = [
      'dispatcher',
      'name',
      'address1',
      'address2',
      'address3',
      'address4',
      'address5',
      'address6',
      'address7',
      'address8',
      'edit'
    ];

    if (!this.showDispatcher) {
      const index = displayedColumns.indexOf('dispatcher');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showDriverName) {
      const index = displayedColumns.indexOf('name');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showMonday) {
      const index = displayedColumns.indexOf('address1');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showTuesday) {
      const index = displayedColumns.indexOf('address2');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showWednesday) {
      const index = displayedColumns.indexOf('address3');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showThursday) {
      const index = displayedColumns.indexOf('address4');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showFriday) {
      const index = displayedColumns.indexOf('address5');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showSaturday) {
      const index = displayedColumns.indexOf('address6');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showSunday) {
      const index = displayedColumns.indexOf('address7');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showMondayNW) {
      const index = displayedColumns.indexOf('address8');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showEdit) {
      const index = displayedColumns.indexOf('edit');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }
    this.displayedColumns = displayedColumns;
  }


  // @ts-ignore
  selectedCell: HTMLElement = null;
  selectedCellDriver: any;
  selectedCellWeekday: any;

  // @ts-ignore
  onCellClicked(event: MouseEvent, driver, weekday: any): void {
    // Remove the highlight from the previously selected cell
    if (this.selectedCell) {
      this.selectedCell.classList.remove('selected-cell');
    }
    const cell = event.target as HTMLElement;
    // Add the highlight to the clicked cell
    cell.classList.add('selected-cell');
    this.selectedCell = cell;

    console.log(this.selectedCell)
    console.log("Driver: ");
    console.log(driver);
    console.log("Weekday: ")
    console.log(weekday)
    this.selectedCellDriver = driver;
    this.selectedCellWeekday = weekday;
    this.editDriverPositionService.updateSelectedDriver(this.selectedCellDriver);
    this.editDriverPositionService.updateSelectedWeekday(this.selectedCellWeekday);
  }

  editDriverPositon() {
    if (this.selectedCellWeekday == null) {
      this.alertService.setMessage("To edit a driver position you first have to select a driver position you want to edit (table cell).");
      this.alertService.setCode(400);
    } else if (this.selectedCellWeekday.status == "") {
      this.alertService.setMessage("The driver position you selected is not part of a ride, therefore the driver position cannot be edited. First add a corresponding ride.");
      this.alertService.setCode(400);
    } else {
      this.go()
    }
  }

  go() {
    this.router.navigate([`../edit-driver-position`], { relativeTo: this.route });
  }

  isAdmin() {
    return sessionStorage.getItem('isAdmin') == "true";
  }

  now = new Date();

  exportTable(){
    this.matTableExporter.exportTable('xlsx', {fileName:'myDriversExport_' + this.now.toDateString(), sheet: 'export'});
  }

  sortColumn(sort: Sort) {
    if(sort.direction) {
      this.dataSource.sort = this.sort;
    }
  }


}
