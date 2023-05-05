import { Component} from '@angular/core';

// Decorator to define a component
@Component({
  selector: 'app-subnav', // Selector for the component
  templateUrl: './subnav.component.html', // Template file for the component
  styleUrls: ['./subnav.component.css'] // Style files for the component
})

// Component class
export class SubnavComponent {

  // Method to check if user is an admin
  isAdmin() {
    return sessionStorage.getItem("isAdmin") == "true";
  }
}

