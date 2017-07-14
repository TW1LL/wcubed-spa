import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Product, OrderItem, Order, Address} from '../models';
import {API} from '../constants/index';
import {Http} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {isEquivalent} from '../pipes/utils';
@Injectable()
export class OrderService {
  url = API.order;
  private cartSub = new Subject<OrderItem[]>();
  private order: Order = new Order();
  constructor(private authService: AuthService, private http: Http) {
    this.order.items = [];
  }

  addToCart(product: Product, quantity: number = 1) {
    const duplicate = this.order.items.findIndex(item => item.product.id === product.id);
    if(duplicate !== -1 && isEquivalent(this.order.items[duplicate].product, product)) {
      this.order.items[duplicate].quantity += 1;
    } else {
      this.order.items.push(new OrderItem(this.order.items.length, product, quantity));
    }
    this.order.total += product.price * quantity;
    this.cartSub.next(this.order.items);
  }

  removeFromCart(item: OrderItem) {
    this.order.items.splice(item.id, 1);
    this.cartSub.next(this.order.items);
  }

  addAddress(address: Address) {
    this.order.address = address;
  }

  finalize() {
    this.order.user = this.authService.getUser();
    if (this.order.user != null &&
        this.order.address != null &&
        this.order.payment != null &&
        this.order.items.length > 0
    ) {
      return this.http.post(this.url, this.order)
    }
  }

  gerOrder() {
    return this.order;
  }
  getCart()  {
    return this.cartSub.asObservable();
  }
  getTotal() {
    return this.order.total;
  }






}
