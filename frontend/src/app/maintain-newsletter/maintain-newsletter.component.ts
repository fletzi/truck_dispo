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

// Initializes the component by calling the getAllBrokers function
  ngOnInit(): void {
    this.getAllBrokers();
  }

// Declares an empty array to hold all brokers
  brokers: any[] = [];

// Sends an HTTP GET request to retrieve all brokers from the server
// Maps the response to only include necessary data
// Updates the brokers array with the response and displays a message if no brokers are found
  getAllBrokers() {
    // The URL to send the request to
    let url = 'https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/mailingList/getAllBrokers';
    // Gets the JSON Web Token (JWT) from session storage
    let token = sessionStorage.getItem('jwt');
    try {
      // Sends the GET request with the JWT and necessary headers
      this.http.get<any[]>(url, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        })
      })
        // Maps the response to only include necessary data
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
        // Updates the brokers array with the response and displays a message if no brokers are found
        .subscribe((brokers) => {
          this.brokers = brokers;
          if (brokers.length == 0) {
            this.alertService.setMessage("No existing subscribers to the newsletter were found.");
            this.alertService.setCode(400);
          }
        });
    } catch (error) {
      // Logs the error if the HTTP request was unsuccessful
      console.error('HTTP Request was not successful', error);
      // Sets the error message in the alert service
      // @ts-ignore
      this.alertService.setMessage(error.statusText + " - Error: " + error.status);
      // @ts-ignore
      this.alertService.setCode(error.status);
    }
  }

// Holds the email of the selected broker
  selectedEmail: string = "";

// Sets the email of the selected broker when a broker is clicked on
  selectBroker(email: string) {
    this.selectedEmail = email;
  }

// Sends an HTTP DELETE request to remove the selected broker from the server
// Displays a message if the broker was successfully removed or an error message if the broker could not be removed
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

// Holds the input values for adding a new broker
  email: string = "";
  firstName: string = "";
  lastName: string = "";

// Returns true if any of the input fields are empty, false otherwise
  fieldsNull() {
    return (this.email == "" || this.firstName == "" || this.lastName == "");
  }

  /**
   * Adds a new broker to the mailing list
   */
  addBroker() {
    // Get JWT token from session storage
    let token = sessionStorage.getItem('jwt');

    // Check if any input fields are empty
    if (this.fieldsNull()) {
      // Set an error message and code for the AlertService
      this.alertService.setMessage("You need to complete your input to add a broker to the mailing list!");
      this.alertService.setCode(400);
    }
    // Check if the email already exists in the mailing list
    else if (this.checkForDublicate(this.email)) {
      // Set an error message and code for the AlertService
      this.alertService.setMessage("This broker is already in the mailing list!");
      this.alertService.setCode(400);
      // Reset the input form
      this.addBrokerForm.reset();
    }
    // If input is valid and broker email does not exist in the mailing list, add new broker
    else {
      // Create data object with email, first name and last name
      const data = { email: this.email, firstName: this.firstName, lastName: this.lastName };
      // Set headers for the HTTP request
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Accept': '*/*',
        'Content-Type': 'application/json'
      });
      // Use a proxy server for development purposes
      // Make HTTP POST request to add new broker to the mailing list
      this.http.post('https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/mailingList/addBroker', data, { headers }).subscribe(
        response => {
        },
        // Handle HTTP error responses
        (error: HttpErrorResponse) => {
          // If broker was successfully added, set success message and update broker list
          if (error.status == 200) {
            this.alertService.setMessage(data.email + " added to the mailing list");
            this.alertService.setCode(error.status);
            this.getAllBrokers();
          }
          // If an error occurred, set error message and code for the AlertService
          else {
            this.alertService.setMessage(error.message);
            this.alertService.setCode(error.status);
          }
        }
      );
      // Reset the input form
      this.addBrokerForm.reset();
    }
  }

  /**
   * Check if a broker email already exists in the mailing list
   * @param email The email of the broker to check for duplicates
   * @returns A boolean indicating whether the email already exists in the mailing list or not
   */
  checkForDublicate(email: string): boolean {
    return this.brokers.some(broker =>
      broker.email.toLowerCase() === email.toLowerCase()
    );
  }

}


