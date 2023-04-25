import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllDriverPositionsService {

  private showingAllDriversSource = new BehaviorSubject<boolean>(false);
  showingAllDrivers$ = this.showingAllDriversSource.asObservable();

  constructor() { }

  updateShowingAllDrivers(showingAllDriversSource: boolean): void {
    this.showingAllDriversSource.next(showingAllDriversSource);
  }

}
