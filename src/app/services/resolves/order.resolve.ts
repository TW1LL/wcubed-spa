import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {OrderService} from '../order.service';
import {LoadingService} from '../loading.service';
import 'rxjs/add/operator/first';
import {Location} from '@angular/common';
import {Order} from '../../../../../wcubed-api/src/models/checkout/order';
@Injectable()
export class OrderResolve implements Resolve<Order> {
  constructor(private location: Location, private orderService: OrderService, private loadingService: LoadingService) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    this.loadingService.setLoading(true);
    return this.orderService.getOrderPromise().then((order: Order) => {
      this.loadingService.setLoading(false);
      if (order.items.length > 0) {
        return order;
      } else {
        this.location.back();
      }
    });
  }
}
