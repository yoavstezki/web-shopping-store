import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product.model';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.list()
      .subscribe((data: any) => {

        if (data.success) {
          this.products = data.products;
        }
      });
  }
}
