import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../../model/product.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../../../service/product.service';
import {AuthService} from '../../../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  products: Product[] = [];

  productName: string;
  productCategory: string;
  productPrice: number;

  productCategories: string[] = [];

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private authService: AuthService, private router: Router) {
    this.searchForm = formBuilder.group({
      productName: new FormControl('',),
      productCategory: new FormControl(''),
      productPrice: new FormControl('')
    })
  }

  onSearch() {
    this.productName = this.searchForm.get('productName').value;
    this.productCategory = this.searchForm.get('productCategory').value;
    this.productPrice = this.searchForm.get('productPrice').value;

    const searchable = {
      username: JSON.parse(this.authService.getUser())['name'],
      name: this.productName,
      category: this.productCategory,
      price: this.productPrice,
    };

    this.productService.search(searchable)
      .subscribe((data: any) => {
          if (data.success) {
            this.products = data.callback;
          }
        }
      );
  }

  ngOnInit(): void {

    this.productService.productCategoryList()
      .subscribe((data: any) => {
        if (data.success) {
          this.productCategories = data.categories;
        }
      });

    this.productService.list()
      .subscribe((data: any) => {
        if (data.success) {
          this.products = data.products;
        }
      });
  }
}
