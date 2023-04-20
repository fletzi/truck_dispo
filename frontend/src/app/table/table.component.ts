import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';
import {MatTableExporterDirective} from 'mat-table-exporter';
import {TableService} from "../table.service";
import {AlertService} from "../alert.service";


export interface Driver {
  name: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  mondayNW: string;
}

const ELEMENT_DATA: Driver[] = [
  {
    name: 'Jane Smith',
    monday: 'Sarasota, FL, USA',
    tuesday: 'Cairo, GA, USA',
    wednesday: 'Kailua, HI, USA',
    thursday: 'Blackfoot, ID, USA',
    friday: 'Effingham, IL, USA',
    saturday: 'Veedersburg, IN, USA',
    sunday: 'Humboldt, IA, USA',
    mondayNW: 'Clay Center, KS, USA'
  },
  {
    name: 'Michael Johnson',
    monday: 'Somerset, KY, USA',
    tuesday: 'Bogalusa, LA, USA',
    wednesday: 'Auburn, ME, USA',
    thursday: 'Severna Park, MD, USA',
    friday: 'Nantucket, MA, USA',
    saturday: 'Belleville, MI, USA',
    sunday: 'Grand Rapids, MN, USA',
    mondayNW: 'Booneville, MS, USA'
  },
  {
    name: 'David Garcia',
    monday: 'Medford, OR, USA',
    tuesday: 'Connellsville, PA, USA',
    wednesday: 'Barrington, RI, USA',
    thursday: 'West Columbia, SC, USA',
    friday: 'Custer, SD, USA',
    saturday: 'Springfield, TN, USA',
    sunday: 'Edinburg, TX, USA',
    mondayNW: 'Ogden, UT, USA'
  },
  {
    name: 'Emily Rodriguez',
    monday: 'Newport, VT, USA',
    tuesday: 'Gordonsville, VA, USA',
    wednesday: 'Yelm, WA, USA',
    thursday: 'Ceredo, WV, USA',
    friday: 'Platteville, WI, USA',
    saturday: 'Sheridan, WY, USA',
    sunday: 'Eleele, HI, USA',
    mondayNW: 'Attu Island, AK, USA'
  },
  {
    name: 'Jacob Martinez',
    monday: 'Hartford, CT, USA',
    tuesday: 'York, PA, USA',
    wednesday: 'Lafayette, LA, USA',
    thursday: 'Brentwood, TN, USA',
    friday: 'Pella, IA, USA',
    saturday: '',
    sunday: 'Huntington Beach, CA, USA',
    mondayNW: 'Bellingham, WA, USA'
  },

  {
    name: 'Olivia Campbell',
    monday: 'Newport, RI, USA',
    tuesday: 'Savannah, GA, USA',
    wednesday: 'Missoula, MT, USA',
    thursday: '',
    friday: 'Mesa, AZ, USA',
    saturday: 'Shreveport, LA, USA',
    sunday: 'Santa Barbara, CA, USA',
    mondayNW: 'Anchorage, AK, USA'
  },

  {
    name: 'Noah Wright',
    monday: 'Buffalo, NY, USA',
    tuesday: 'Durham, NC, USA',
    wednesday: 'Portland, OR, USA',
    thursday: 'Athens, GA, USA',
    friday: 'Waco, TX, USA',
    saturday: 'Des Moines, IA, USA',
    sunday: 'Las Vegas, NV, USA',
    mondayNW: ''
  },

  {
    name: 'Ava Rodriguez',
    monday: 'Manchester, NH, USA',
    tuesday: 'Richmond, VA, USA',
    wednesday: 'Fort Collins, CO, USA',
    thursday: 'Fairfax, VA, USA',
    friday: '',
    saturday: 'Tallahassee, FL, USA',
    sunday: 'Portland, ME, USA',
    mondayNW: 'Seattle, WA, USA'
  },

  {
    name: 'William Chen',
    monday: 'Austin, TX, USA',
    tuesday: 'Syracuse, NY, USA',
    wednesday: 'Boise, ID, USA',
    thursday: '',
    friday: 'Las Cruces, NM, USA',
    saturday: 'Memphis, TN, USA',
    sunday: '',
    mondayNW: 'Olympia, WA, USA'
  },

  {
    name: 'Daniel Hernandez',
    monday: 'Galliano, LA, USA',
    tuesday: 'Fort Kent, ME, USA',
    wednesday: 'Walkersville, MD, USA',
    thursday: 'Wakefield, MA, USA',
    friday: 'Ferndale, MI, USA',
    saturday: 'Brandon, MS, USA',
    sunday: 'South Sioux City, NE, USA',
    mondayNW: 'Fernley, NV, USA'
  }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {

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

  constructor(private tableControlService: TableService, private  alertService: AlertService) { }

  ngOnInit(): void {
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

    this.tableControlService.searchString$.subscribe(searchString => {
      this.filterTable(searchString);
    });

  }

  filterTable(searchString: string) {
    // @ts-ignore
    this.alertService.setMessage(null);
    // @ts-ignore
    this.alertService.setCode(null);
    this.dataSource.filteredData = this.dataSource.data.filter((driver) =>
      Object.values(driver)
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
  @ViewChild(MatSort) sort: MatSort

  // @ts-ignore
  @ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

  hiddenColumns: number[] = [];

  updateHiddenColumns() {
    this.hiddenColumns = [9];

    if (!this.showDriverName) {
      this.hiddenColumns.push(0); // driver name column index
    }

    if (!this.showMonday) {
      this.hiddenColumns.push(1); // monday column index
    }

    if (!this.showTuesday) {
      this.hiddenColumns.push(2); // tuesday column index
    }

    if (!this.showWednesday) {
      this.hiddenColumns.push(3); // wednesday column index
    }

    if (!this.showThursday) {
      this.hiddenColumns.push(4); // thursday column index
    }

    if (!this.showFriday) {
      this.hiddenColumns.push(5); // friday column index
    }

    if (!this.showSaturday) {
      this.hiddenColumns.push(6); // saturday column index
    }

    if (!this.showSunday) {
      this.hiddenColumns.push(7); // sunday column index
    }

    if (!this.showMondayNW) {
      this.hiddenColumns.push(8); // mondayNW column index
    }

  }

  displayedColumns: string[] = ['name', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'mondayNW', 'edit'];

  updateView() {
    const displayedColumns = [
      'name',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
      'mondayNW',
      'edit'
    ];

    if (!this.showDriverName) {
      const index = displayedColumns.indexOf('name');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showMonday) {
      const index = displayedColumns.indexOf('monday');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showTuesday) {
      const index = displayedColumns.indexOf('tuesday');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showWednesday) {
      const index = displayedColumns.indexOf('wednesday');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showThursday) {
      const index = displayedColumns.indexOf('thursday');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showFriday) {
      const index = displayedColumns.indexOf('friday');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showSaturday) {
      const index = displayedColumns.indexOf('saturday');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showSunday) {
      const index = displayedColumns.indexOf('sunday');
      if (index >= 0) {
        displayedColumns.splice(index, 1);
      }
    }

    if (!this.showMondayNW) {
      const index = displayedColumns.indexOf('mondayNW');
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

  dataSource = new MatTableDataSource(ELEMENT_DATA);


  // @ts-ignore
  selectedCell: HTMLElement = null;

  onCellClicked(event: MouseEvent): void {
    // Cast the EventTarget object to the HTMLElement object
    const cell = event.target as HTMLElement;

    // Remove the highlight from the previously selected cell
    if (this.selectedCell) {
      this.selectedCell.classList.remove('selected-cell');
    }

    // Add the highlight to the clicked cell
    cell.classList.add('selected-cell');
    this.selectedCell = cell;
  }

  isAdmin() {
    return sessionStorage.getItem('isAdmin') == "true";
  }

  now = new Date();

  exportTable(){
    this.matTableExporter.exportTable('xlsx', {fileName:'myDriversExport_' + this.now.toDateString(), sheet: 'export'});
  }

}
