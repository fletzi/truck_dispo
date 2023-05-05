import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllDriverPositionsService {

  private showingAllDriversSource = new BehaviorSubject<boolean>(false);
  showingAllDrivers$ = this.showingAllDriversSource.asObservable();

  constructor() { }

  /**
   * This function updates the value of a boolean variable indicating whether all drivers should be shown or not.
   * @param {boolean} showingAllDriversSource - A boolean value indicating whether all drivers should be shown or not.
   */
  updateShowingAllDrivers(showingAllDriversSource: boolean): void {
    this.showingAllDriversSource.next(showingAllDriversSource);
  }

}
