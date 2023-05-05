import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private showDispatcherSource = new BehaviorSubject<boolean>(true);
  showDispatcher$ = this.showDispatcherSource.asObservable();

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

  // @ts-ignore
  private selectedWeekDateSource = new BehaviorSubject<Date>();
  selectedWeekDate$ = this.selectedWeekDateSource.asObservable();

  // @ts-ignore
  private selectedMondaySource = new BehaviorSubject<Date>();
  selectedMonday$ = this.selectedMondaySource.asObservable();

  constructor() { }

  /* These are methods in the `TableService` class that update the values of various `BehaviorSubject` observables. Each
  method takes in a new value for the corresponding observable and calls the `next()` method on the `BehaviorSubject` to
  emit the new value to all subscribers of the observable. For example, `updateShowDispatcher()` takes in a boolean
  value for `showDispatcherSource` and updates the `showDispatcherSource` observable with the new value using
  `this.showDispatcherSource.next(showDispatcherSource)`. This allows other components or services in the application to
  subscribe to these observables and react to changes in their values. */

  updateShowDispatcher(showDispatcherSource: boolean): void {
    this.showDispatcherSource.next(showDispatcherSource);
  }

  updateSelectedMonday(selectedMondaySource: Date): void {
    this.selectedMondaySource.next(selectedMondaySource);
  }

  updateSelectedWeekDateFormatted(selectedWeekDateFormattedSource: Date): void {
    this.selectedWeekDateSource.next(selectedWeekDateFormattedSource);
  }

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
