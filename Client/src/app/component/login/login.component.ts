import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username: String;
  password: String;


  constructor(private authService: AuthService,
              private router: Router) {
  }

  login() {
    this.authService
      .authenticateUser({username: this.username, password: this.password})
      .subscribe((data: any) => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['profile']);
        } else {
          //todo: handle error and display.
        }
      })
  }
}
