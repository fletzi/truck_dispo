import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditDriverPositionService {

  // @ts-ignore
  private selectedDriverSource = new BehaviorSubject<any>();
  selectedDriver$ = this.selectedDriverSource.asObservable();

  // @ts-ignore
  private selectedWeekdaySource = new BehaviorSubject<any>();
  selectedWeekday$ = this.selectedWeekdaySource.asObservable();

  constructor() { }

  /**
   * The function updates the selected driver source.
   * @param {any} selectedDriverSource - The parameter `selectedDriverSource` is of type `any`, which means it can be any
   * data type (string, number, object, etc.). It is used as an argument to update the value of a `BehaviorSubject` called
   * `selectedDriverSource`. The `next()` method of the `
   */
  updateSelectedDriver(selectedDriverSource: any): void {
    this.selectedDriverSource.next(selectedDriverSource);
  }

  /**
   * The function updates the selected weekday source.
   * @param {any} selectedWeekSource - It is a parameter of type `any` which represents the source of the selected weekday.
   * It could be a string, number, object or any other data type.
   */
  updateSelectedWeekday(selectedWeekSource: any): void {
    this.selectedWeekdaySource.next(selectedWeekSource);
  }
}
