import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { IProduct } from "../product";

@Component({
  selector: "pm-product-shell-detail",
  templateUrl: "./product-shell-detail.component.html",
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";

  // a simple property declaration would be only called once, at the time component was rendered
  // so it would not keep sync between components
  get product(): IProduct | null {
    return this.productService.currentProduct;
  }

  constructor(private productService: ProductService) {}

  ngOnInit() {}
}
