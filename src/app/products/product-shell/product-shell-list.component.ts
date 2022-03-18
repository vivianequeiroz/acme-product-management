import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { IProduct } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: "pm-product-shell-list",
  templateUrl: "./product-shell-list.component.html",
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Products";
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;

  subscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => (this.selectedProduct = selectedProduct)
    );

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  onSelected(product: IProduct): void {
    this.productService.changeSelectedProduct(product);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
