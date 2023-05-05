import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage = '';
  isLoading: boolean = false;

  // @ts-ignore
  @ViewChild('loginForm', {static: false}) loginForm: NgForm;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}
  // Method to check if the email and password fields are empty
  fieldsNull() {
    return (this.email == "" || this.password == "");
  }

  // The onSubmit() method for the login form
  onSubmit() {
    this.isLoading = true;
    if(this.fieldsNull()) {
      //error
      this.isLoading = false;
      this.errorMessage = 'missing fields';
    } else {
      const data = {email: this.email, password: this.password};
      // https://cors-anywhere.herokuapp.com/ - Proxy for dev purposes
      this.http.post('https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/auth/signin', data).subscribe(response => {
          // Save the response values to session storage
          // @ts-ignore
          sessionStorage.setItem('jwt', response.jwt);
          // @ts-ignore
          sessionStorage.setItem('firstname', response.firstname);
          // @ts-ignore
          sessionStorage.setItem('email', response.email);
          // @ts-ignore
          if (response.roles.includes('ROLE_ADMIN')) {
            sessionStorage.setItem('isAdmin', 'true');
          }
          // Navigate to the user's driver positions
          this.go();
        },
        // Handle any errors
        (error: HttpErrorResponse) => {
          // Handle the error response here
          if (error.status === 401) {
            this.isLoading = false;
            this.errorMessage = 'Invalid email address or password';
          } else {
            this.isLoading = false;
            this.errorMessage = 'unexpected error while connecting to backend: ' + error.status;
          }
        }
      );
      // Reset the form
      this.loginForm.reset();
    }
  }

  // Clear the error message
  clearError() {
    this.errorMessage = '';
  }

  // Navigate to the user's driver positions
  go() {
    this.router.navigate([`../my-driver-positions`], { relativeTo: this.route });
  }

}
