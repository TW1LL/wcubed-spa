import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../../../models';
import {LoadingService} from '../../framework/services/loading.service';
@Injectable()
export class ProductDetailsResolve implements Resolve<Product> {
  constructor(private productService: ProductService, private loadingService: LoadingService) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    this.loadingService.setLoading(true);
    const id = route.paramMap.get('id') || null;
    const prod = this.productService.getProduct(+id);
    return prod.then((product) => {
      this.loadingService.setLoading(false);
      return product;
    });
  }
}
