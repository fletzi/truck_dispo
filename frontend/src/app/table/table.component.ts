import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';


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

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['name', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'mondayNW', 'edit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // @ts-ignore
  highlight(row) {

  }

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
}
