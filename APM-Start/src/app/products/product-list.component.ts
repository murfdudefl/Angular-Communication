import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

    // ViewChild establishes a reference to a child component
    // This reference can be based on a hashtag added to the parent template (as shown)
    // or a child component type if only one child component of that type is used in
    // the parent template (code commented out below)
    @ViewChild('filterCriteria') filterElementRef: CriteriaComponent;
    // @ViewChild(CriteriaComponent) filterElementRef: CriteriaComponent;

    pageTitle: string = 'Product List';
    showImage: boolean;
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    parentFilter: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    includeFilterDetail: boolean = true;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        this.parentFilter = this.filterElementRef.listFilter;
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    filterChanged(filterValue: string) {
        this.parentFilter = filterValue;
        this.performFilter(filterValue);
        console.log(`Filter value changed to ${filterValue}`);
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
