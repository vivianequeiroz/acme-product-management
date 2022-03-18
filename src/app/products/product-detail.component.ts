import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product Detail";
  product: IProduct;
  errorMessage: string;

  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get("id");
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.subscription = this.productService.getProduct(id).subscribe(
      (product) => (this.product = product),
      (error) => (this.errorMessage = <any>error)
    );
  }

  onBack(): void {
    this.router.navigate(["/products"]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
