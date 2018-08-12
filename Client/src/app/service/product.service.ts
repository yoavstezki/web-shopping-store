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

  productCategoryList() {
    return this.httpClient.get<string[]>('/api/products/productCategoryList');
  }

  create(product) {
    return this.httpClient.post('/api/products/create', product);
  }

  categoryCount() {
    return this.httpClient.get('/api/products/categoryCount');
  }

  categoryAvg() {
    return this.httpClient.get('/api/products/categoryAvg');
  }

  getProductBySerial(serial: number) {
    return this.httpClient.get(`/api/products/${serial}`)
  }

  update(product) {
    return this.httpClient.post('/api/products/update', product);
  }

  search(searchable) {
    return this.httpClient.post('/api/products/search', searchable);
  }

  delete(serial: number) {
    return this.httpClient.get(`/api/products/delete/${serial}`);
  }
}
