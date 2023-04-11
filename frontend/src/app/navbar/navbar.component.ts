import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  username: string = 'User';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // @ts-ignore
    this.username = sessionStorage.getItem('firstname');
  }

  onLogout() {
    sessionStorage.clear();
    this.go();
  }

  go() {
    this.router.navigate([`../login`], { relativeTo: this.route });
  }
}
