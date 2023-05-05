import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string = 'User';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Set username to the value stored in sessionStorage.
    // If it's not there, the username remains "User".
    // @ts-ignore
    this.username = sessionStorage.getItem('firstname');
  }

  onLogout() {
    // Clear the sessionStorage when the user logs out.
    sessionStorage.clear();
    // Call the go() method to navigate to the login page.
    this.go();
  }

  go() {
    // Navigate to the login page using the Router.
    this.router.navigate([`../login`], { relativeTo: this.route });
  }
}

