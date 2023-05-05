import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @ts-ignore
  data: string;
  constructor(private router: Router, private route: ActivatedRoute) {}
  title = 'frontend';

  /**
   * The function checks if a JWT token is stored in the session storage and redirects if it is not present.
   */
  ngOnInit() {
    if (sessionStorage.getItem('jwt') == null) {
      this.go();
    }
  }

  /**
   * The function navigates to the login page relative to the current route.
   */
  go() {
    this.router.navigate([`../login`], { relativeTo: this.route });
  }

}
