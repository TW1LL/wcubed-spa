import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ProductService} from './product.service';
import {Product} from '../models';
@Injectable()
export class ProductListResolve implements Resolve<Product[]> {
  constructor(private productService: ProductService) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    const category = route.paramMap.get('category') || null;
    const prods = this.productService.getProducts(category);
    return prods.then((products) => products);
  }
}
