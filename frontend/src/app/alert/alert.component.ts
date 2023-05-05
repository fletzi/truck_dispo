import {Component, OnInit, OnDestroy} from '@angular/core';
import {AlertService} from '../alert.service';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    // Define the fade-in animation
    trigger('fadeInOut', [
      // Set animation for entering element
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1}))
      ]),
      // Set animation for leaving element
      transition(':leave', [
        animate('300ms', style({opacity: 0}))
      ])
    ])
  ]
})
// Define the AlertComponent
export class AlertComponent implements OnInit, OnDestroy {

  // Variables to store the error message and code
  errorMessage: any;
  errorCode: any;

  // Timer ID returned by setTimeout()
  hideTimeout: any;

  constructor(private alertService: AlertService) {
  }

  // Lifecycle hook called after the component is initialized
  ngOnInit() {
    // Subscribe to the messageUpdate event from the AlertService
    this.alertService.messageUpdate.subscribe(
      // Callback function to handle the event
      (message: string) => {
        // Update the errorMessage variable
        this.errorMessage = message;
        // Set a timer to hide the alert after 10 seconds
        this.setHideTimeout();
      }
    );

    // Subscribe to the codeUpdate event from the AlertService
    this.alertService.codeUpdate.subscribe(
      // Callback function to handle the event
      (code: number) => {
        // Update the errorCode variable
        this.errorCode = code;
        // Set a timer to hide the alert after 10 seconds
        this.setHideTimeout();
      }
    );
  }

  // Lifecycle hook called when the component is destroyed
  ngOnDestroy() {
    // Clean up the timer when the component is destroyed
    clearTimeout(this.hideTimeout);
  }

  // Method to set a timer to hide the alert after 10 seconds
  setHideTimeout() {
    // Clear the previous timer (if there was one)
    clearTimeout(this.hideTimeout);
    // Set a new timer to hide the alert after 10 seconds
    this.hideTimeout = setTimeout(() => {
      this.errorMessage = null;
      this.errorCode = null;
    }, 10000);
  }

}
