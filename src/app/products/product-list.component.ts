import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";
import { CriteriaComponent } from "../shared/criteria/criteria.component";

import { IProduct } from "./product";
import { ProductParameterService } from "./product-parameter.service";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  pageTitle: string = "Product List";
  includeDetail: boolean = true;

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter: string;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  subscription: Subscription;

  get showImage() {
    return this.productParameterService.showImage;
  }

  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  constructor(
    private productService: ProductService,
    private productParameterService: ProductParameterService
  ) {}

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  ngOnInit(): void {
    this.subscription = this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  onValueChange(eventPayload: string): void {
    this.productParameterService.filterBy = eventPayload;
    this.performFilter(eventPayload);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
