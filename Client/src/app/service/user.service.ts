import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user.model';
import {map} from 'rxjs/operators';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  create(user: User) {
    return this.http.post('api/create', user)
      .pipe(
        map(user => <User> user)
      )
  }
}
