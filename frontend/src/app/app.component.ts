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

  ngOnInit() {
    // Überprüfen Sie, ob der Session Storage den Key "myKey" enthält
    if (sessionStorage.getItem('jwt') == null) {
      //Routing to loginpage
      this.go();
    }
  }

  go() {
    this.router.navigate([`../login`], { relativeTo: this.route });
  }

}
