import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Products';
    monthCount: number;
    selectedProductSubscription: Subscription;

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.selectedProductSubscription = this.productService.selectedProductChanges$.subscribe(selectedProduct => {
            if (selectedProduct) {
            const released = new Date(selectedProduct.releaseDate);
            const today = new Date();
            this.monthCount = today.getMonth() - released.getMonth() +
            12 * (today.getFullYear() - released.getFullYear());
            } else {
                this.monthCount = 0;
            }
        });
    }

    ngOnDestroy() {
        this.selectedProductSubscription.unsubscribe();
    }
}
