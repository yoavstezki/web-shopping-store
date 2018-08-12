import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../service/product.service';
import {Product} from '../../../../../model/product.model';
import {ShopService} from '../../../../service/shop.service';
import {nameValidator} from '../../../register/register.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  product: Product;
  productCategories: string[] = [];
  shopNames: string[] = [];


  productName: FormControl;
  productCategory: FormControl;
  weightable: FormControl;
  productPrice: FormControl;
  productManufacturer: FormControl;
  productStoreName: FormControl;
  productImageUrl: FormControl;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private shopService: ShopService, private router: Router) {
  }

  ngOnInit(): void {

    this.createFormControls();
    this.createFrom();

    this.productService.productCategoryList()
      .subscribe((data: any) => {
        if (data.success) {
          this.productCategories = data.categories;
        }
      });

    this.shopService.getShopsNames()
      .subscribe((data: any) => {
        if (data.success) {
          this.shopNames = data.names;
        }
      });
  }

  onCreateProduct() {
    const serial = Math.floor(Math.random() * 10000);

    const product = {
      serial: serial,
      name: this.productForm.get('productName').value,
      category: this.productForm.get('productCategory').value,
      weightable: this.productForm.get('weightable').value,
      price: this.productForm.get('productPrice').value,
      manufacturer: this.productForm.get('productManufacturer').value,
      storeName: this.productForm.get('productStoreName').value,
      imageUrl: this.productForm.get('productImageUrl').value
    };

    this.productService.create(product)
      .subscribe((data: any) => {
          if (data.success) {
            this.router.navigate(['/product']);
          }
        }
      );

  }

  private createFormControls() {
    this.productName = new FormControl('', nameValidator);
    this.productCategory = new FormControl('', Validators.required);
    this.weightable = new FormControl('', Validators.required);
    this.productPrice = new FormControl('', Validators.required);
    this.productManufacturer = new FormControl('', Validators.required);
    this.productStoreName = new FormControl('', Validators.required);
    this.productImageUrl = new FormControl('');
  }

  private createFrom() {
    this.productForm = this.formBuilder.group({
      productName: this.productName,
      productCategory: this.productCategory,
      weightable: this.weightable,
      productPrice: this.productPrice,
      productManufacturer: this.productManufacturer,
      productStoreName: this.productStoreName,
      productImageUrl: this.productImageUrl
    });
  }

}
