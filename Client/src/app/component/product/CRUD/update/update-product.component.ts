import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../../../service/product.service';
import {ShopService} from '../../../../service/shop.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {nameValidator} from '../../../register/register.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {

  productCategories: string[] = [];
  shopNames: string[] = [];
  productForm: FormGroup;
  productName: FormControl;
  productCategory: FormControl;
  weightable: FormControl;
  productPrice: FormControl;
  productManufacturer: FormControl;
  productStoreName: FormControl;
  productImageUrl: FormControl;

  private serial: number;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private productService: ProductService, private shopService: ShopService, private router: Router) {
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

    this.route.params.subscribe(
      (params: Params) => {
        this.serial = parseInt(params['serial']);
        this.displayProduct(this.serial);
      }
    )
  }

  onUpdateProduct() {
    const product = {
      serial: this.serial,
      name: this.productForm.get('productName').value,
      category: this.productForm.get('productCategory').value,
      weightable: this.productForm.get('weightable').value,
      price: this.productForm.get('productPrice').value,
      manufacturer: this.productForm.get('productManufacturer').value,
      storeName: this.productForm.get('productStoreName').value,
      imageUrl: this.productForm.get('productImageUrl').value
    };

    this.productService.update(product)
      .subscribe((data: any) => {
        if (data.success) {
          this.router.navigate(['/product']);
        }
      })
  }


  private displayProduct(serial: number) {
    this.productService.getProductBySerial(serial)
      .subscribe((data: any) => {
        if (data.success) {
          this.setValues(data.product);
        }
      })
  }

  private setValues(product: any) {
    this.productForm.controls['productName'].setValue(product.productName);
    this.productForm.controls['productCategory'].setValue(product.productCategory);
    this.productForm.controls['weightable'].setValue(product.weightable);
    this.productForm.controls['productPrice'].setValue(product.productPrice);
    this.productForm.controls['productManufacturer'].setValue(product.productManufacturer);
    this.productForm.controls['productStoreName'].setValue(product.productStoreName);
    this.productForm.controls['productImageUrl'].setValue(product.productImageUrl);
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
