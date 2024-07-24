import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login, UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  loginId: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService, private cookieService:CookieService ) { }


  onSubmit() {
    this.cookieService.deleteAll()
    if (this.loginId && this.password) {
      this.errorMessage = ''
      const loginInfo: Login = {
        LoginID: this.loginId,
        Password: this.password
      }
      this.userService.login(loginInfo)
        .subscribe(response => {
          if (response.error) {
            this.errorMessage = 'LoginID or Password is not correct';
          } else {
            this.errorMessage = ''
            this.userService.currentUser = response

            if (response.UserRole == 'Admin') {
              this.cookieService.set('authorized', 'true')
              this.router.navigate(['/transactions'])
            } else if (response.UserRole === 'Seller') {
              this.errorMessage = 'Dear Seller , you dont have access to this app please check with your manager';
            } else {
              this.errorMessage = 'Your Role is not correct please call your company HR';
            }
          }
        }, error => {
          console.log(error)
          this.errorMessage = 'LoginID or Password is not correct';
        });

    } else {
      this.errorMessage = "Please fill all the inputs first"
    }
  }

}
