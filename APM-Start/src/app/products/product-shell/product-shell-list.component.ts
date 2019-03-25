import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
  selectedProductSubscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
    this.selectedProductSubscription = this.productService.selectedProductChanges$.subscribe(selectedProduct => {
      this.selectedProduct = selectedProduct;
      if (selectedProduct) {
        console.log(`Selected Product ID: ${selectedProduct.productName}`);
      }
    });
  }

  ngOnDestroy() {
    this.selectedProductSubscription.unsubscribe();
  }

  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product);
  }

}
