import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../model/user.model';
import {AuthService} from './auth.service';


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  register(user: User) {
    return this.http.post('api/users/register', user);
  }

  getUserProfile() {
    const userToken = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': userToken
      })
    };

    return this.http.get<User>('api/users/profile', httpOptions);
  }
}
