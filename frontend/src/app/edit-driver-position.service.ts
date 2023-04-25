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

  updateSelectedDriver(selectedDriverSource: any): void {
    this.selectedDriverSource.next(selectedDriverSource);
  }

  updateSelectedWeekday(selectedWeekSource: any): void {
    this.selectedWeekdaySource.next(selectedWeekSource);
  }
}
