import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

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

    private _showImage: boolean;
    private _listFilter: string;

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    includeFilterDetail: boolean = true;

    constructor(
        private productService: ProductService,
        private productParameterService: ProductParameterService) { }

    ngOnInit(): void {
        this._listFilter = this.productParameterService.filterBy;
        this._showImage = this.productParameterService.showImage;
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        // this.listFilter = this.filterElementRef.listFilter;
        this.filterElementRef.listFilter = this.listFilter;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    get showImage(): boolean {
        return this._showImage;
    }
    set showImage(value: boolean) {
        this._showImage = value;
        this.productParameterService.showImage = value;
    }

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.productParameterService.filterBy = value;
        console.log(`List filter set to ${this.listFilter}`);
    }

    filterChanged(filterValue: string) {
        this.listFilter = filterValue;
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
