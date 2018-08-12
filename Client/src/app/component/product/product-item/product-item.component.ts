import {Component, Input} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent {
  @Input() product;

  constructor(private productService: ProductService, private router: Router) {
  }

  onDelete(serial) {
    this.productService.delete(serial)
      .subscribe((data: any) => {
        if (data.success) {
          this.router.navigate(['/product'])
        }
      })
  }

}
