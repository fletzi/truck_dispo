import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AlertService} from "../alert.service";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-maintain-newsletter',
  templateUrl: './maintain-newsletter.component.html',
  styleUrls: ['./maintain-newsletter.component.css']
})
export class MaintainNewsletterComponent implements OnInit {

  // @ts-ignore
  @ViewChild('addBrokerForm', {static: false}) addBrokerForm: NgForm;

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getAllBrokers();
  }


  brokers: any[] = [];

  getAllBrokers() {
    let url = 'https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/mailingList/getAllBrokers';
    let token = sessionStorage.getItem('jwt');
    try {
      this.http.get<any[]>(url, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        })
      })
        .pipe(
          map((response) => {
            return response.map((broker) => {
              return {
                id: broker.id,
                email: broker.email,
                firstName: broker.firstName,
                lastName: broker.lastName
              };
            });
          })
        )
        .subscribe((brokers) => {
          this.brokers = brokers;
          console.log(this.brokers);
        });
    } catch (error) {
      console.error('HTTP Request was not successful', error);
      // @ts-ignore
      this.alertService.setMessage(error.statusText + " - Error: " + error.status);
      // @ts-ignore
      this.alertService.setCode(error.status);
    }
  }

  selectedEmail: string = "";

  selectBroker(email: string) {
    this.selectedEmail = email;
  }

  removeBroker() {
    const token = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Accept': '*/*',
      'Content-Type': 'application/json'
    });
    const url = `https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/mailingList/deleteBroker/${this.selectedEmail}`;
    this.http.delete(url, { headers }).subscribe(
      (response) => {
        this.getAllBrokers();
      },
      (error) => {
        if (error.status == 200) {
          this.alertService.setMessage(this.selectedEmail + ' removed from the mailing list');
          this.alertService.setCode(error.status);
          this.selectedEmail = "";
          this.getAllBrokers();
        } else {
          this.alertService.setMessage(error.message);
          this.alertService.setCode(error.status);
        }
      }
    );
  }


  email: string = "";
  firstName: string = "";
  lastName: string = "";

  fieldsNull() {
    return (this.email == "" || this.firstName == "" || this.lastName == "");
  }

  addBroker() {
    let token = sessionStorage.getItem('jwt');
    if (this.fieldsNull()) {
      this.alertService.setMessage("You need to complete your input to add a broker to the mailing list!");
      this.alertService.setCode(400);
    } else if (this.checkForDublicate(this.email)) {
      this.alertService.setMessage("This broker is already in the mailing list!");
      this.alertService.setCode(400);
      this.addBrokerForm.reset();
    } else {
      const data = {email: this.email, firstName: this.firstName, lastName: this.lastName};
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Accept': '*/*',
        'Content-Type': 'application/json'
      });
      // https://cors-anywhere.herokuapp.com/ - Proxy for dev purposes
      this.http.post('https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/mailingList/addBroker', data, {headers}).subscribe(response => {
        },
        (error: HttpErrorResponse) => {
          if (error.status == 200) {
            this.alertService.setMessage(data.email + " added to the mailing list");
            this.alertService.setCode(error.status);
            this.getAllBrokers();
          } else {
            this.alertService.setMessage(error.message);
            this.alertService.setCode(error.status);
          }
        }
      );
      this.addBrokerForm.reset();
    }
  }

  checkForDublicate(email: string): boolean {
    return this.brokers.some(broker =>
      broker.email.toLowerCase() === email.toLowerCase()
    );
  }

}


