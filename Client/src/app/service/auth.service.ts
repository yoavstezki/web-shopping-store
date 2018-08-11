import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  private helper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {
  }

  authenticateUser(loginData) {
    return this.httpClient.post('/api/users/authenticate', loginData)
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  loggedIn() {
    return !this.helper.isTokenExpired(this.getToken());
  }
}
