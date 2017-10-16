import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../../../models';
import {LoadingService} from '../../framework/services/loading.service';
@Injectable()
export class ProductListResolve implements Resolve<Product[]> {
  constructor(private productService: ProductService, private loadingService: LoadingService) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    this.loadingService.setLoading(true);
    const category = route.paramMap.get('category') || null;
    const prods = this.productService.getProducts(category);
    return prods.then((products) => {
      this.loadingService.setLoading(false);
      return products;
    });
  }
}
