import { Component} from '@angular/core';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css']
})

export class SubnavComponent {

  isAdmin() {
    return sessionStorage.getItem("isAdmin") == "true";
  }
}
