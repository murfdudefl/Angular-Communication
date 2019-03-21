import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    showImage: boolean;
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    includeFilterDetail: boolean = false;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter();
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

    // get listFilter(): string {
    //     return this._listFilter;
    // }
    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.performFilter(value);
    // }

    // onFilterChange(value: string): void {
    //     this.listFilter = value;
    //     this.performFilter(value);
    // }
}
