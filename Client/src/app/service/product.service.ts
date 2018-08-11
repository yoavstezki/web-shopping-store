import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Product} from '../../model/product.model';


@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {
  }

  list() {
    return this.httpClient.get('/api/products/list')
      .pipe(map(products => <Product[]> products))
  }


}
