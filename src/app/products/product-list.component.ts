import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";

import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = "Product List";
  showImage: boolean;
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  @ViewChild("filterElement") filterElementRef: ElementRef;
  @ViewChildren("filterElement, nameElement")
  inputElementsRef: QueryList<ElementRef>;

  private _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(this._listFilter);
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
    console.log(this.inputElementsRef);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  onFilterChange(filter: string): void {
    this.listFilter = filter;
    this.performFilter(this.listFilter);
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
