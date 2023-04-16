import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private showDriverNameSource = new BehaviorSubject<boolean>(true);
  showDriverName$ = this.showDriverNameSource.asObservable();

  private showEditSource = new BehaviorSubject<boolean>(true);
  showEdit$ = this.showEditSource.asObservable();

  private showMondaySource = new BehaviorSubject<boolean>(true);
  showMonday$ = this.showMondaySource.asObservable();

  private showTuesdaySource = new BehaviorSubject<boolean>(true);
  showTuesday$ = this.showTuesdaySource.asObservable();

  private showWednesdaySource = new BehaviorSubject<boolean>(true);
  showWednesday$ = this.showWednesdaySource.asObservable();

  private showThursdaySource = new BehaviorSubject<boolean>(true);
  showThursday$ = this.showThursdaySource.asObservable();

  private showFridaySource = new BehaviorSubject<boolean>(true);
  showFriday$ = this.showFridaySource.asObservable();

  private showSaturdaySource = new BehaviorSubject<boolean>(true);
  showSaturday$ = this.showSaturdaySource.asObservable();

  private showSundaySource = new BehaviorSubject<boolean>(true);
  showSunday$ = this.showSundaySource.asObservable();

  private showMondayNWSource = new BehaviorSubject<boolean>(true);
  showMondayNW$ = this.showMondayNWSource.asObservable();


  private searchString = new BehaviorSubject<string>("");
  searchString$ = this.searchString.asObservable();

  constructor() { }

  updateSearchString(searchString: string): void {
    this.searchString.next(searchString);
  }

  updateShowDriverName(showDriverName: boolean): void {
    this.showDriverNameSource.next(showDriverName);
  }

  updateShowEdit(showEdit: boolean): void {
    this.showEditSource.next(showEdit);
  }

  updateShowMonday(showMonday: boolean): void {
    this.showMondaySource.next(showMonday);
  }

  updateShowTuesday(showTuesday: boolean): void {
    this.showTuesdaySource.next(showTuesday);
  }

  updateShowWednesday(showWednesday: boolean): void {
    this.showWednesdaySource.next(showWednesday);
  }

  updateShowThursday(showThursday: boolean): void {
    this.showThursdaySource.next(showThursday);
  }

  updateShowFriday(showFriday: boolean): void {
    this.showFridaySource.next(showFriday);
  }

  updateShowSaturday(showSaturday: boolean): void {
    this.showSaturdaySource.next(showSaturday);
  }

  updateShowSunday(showSunday: boolean): void {
    this.showSundaySource.next(showSunday);
  }

  updateShowMondayNW(showMondayNW: boolean): void {
    this.showMondayNWSource.next(showMondayNW);
  }

}
