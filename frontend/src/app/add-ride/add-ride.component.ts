import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {format} from "date-fns";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {
  dispatcherDrivers: any;
  isLoading: boolean = true;

  selectedDriver: string = "";
  startDate: any;
  endDate: any;

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getDispatcherDrivers().then(r => this.isLoading = false);
  }

  async getDispatcherDrivers() {
    // @ts-ignore
    const dispatcher: string = sessionStorage.getItem("email");
    // https://cors-anywhere.herokuapp.com/ - Proxy for dev purposes
    let url = `https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/mgmt/getDispatcher/${dispatcher}`;
    let token = sessionStorage.getItem('jwt');
    try {
      let data: any;
      data = await this.http.get(url, {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + token,
            'Accept': '*/*',
            'Content-Type': 'application/json'
          }),
      }).toPromise();
      this.dispatcherDrivers = data.drivers;
      console.log(this.dispatcherDrivers);
    } catch (error) {
      console.error('HTTP Request was not successful', error);
      // @ts-ignore
      this.alertService.setMessage(error.statusText);
      // @ts-ignore
      this.alertService.setCode(error.status);
    }
  }

  onSelected(value: string) {
    this.selectedDriver = value;
  }

  OnStartDateChange(value: unknown) {
    this.startDate = value;
    console.log("StartDate "+this.startDate );
  }

  OnEndDateChange(value: unknown) {
    this.endDate = value;
    console.log("EndDate "+this.endDate );
  }
}
