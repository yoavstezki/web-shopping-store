import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ShopService {
  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get('api/shops/list');
  }

  getShopsNames() {
    return this.http.get('api/shops/names');
  }
}
