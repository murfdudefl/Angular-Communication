import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';

    product: IProduct | null;
    prodSubscription: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.prodSubscription = this.productService.selectedProductChanges$.subscribe(selectedProduct => this.product = selectedProduct);
    }

    ngOnDestroy() {
        this.prodSubscription.unsubscribe();
    }
    // get product(): IProduct | null {
    //     return this.productService.currentProduct;
    // }
}
