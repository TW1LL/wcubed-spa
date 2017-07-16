import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Product, OrderItem, Order, Address, OrderShipment, Parcel} from '../models';
import {API} from '../constants/index';
import {Http, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {isEquivalent} from '../pipes/utils';
@Injectable()
export class OrderService {
  url = API.order;
  shipmentCreateUrl = API.shipmentCreate;
  shipmentBuyUrl = API.shipmentBuy;
  private cartSub = new Subject<OrderItem[]>();
  private order: Order = new Order();
  private shipmentId: string;
  private rates: any;
  constructor(private authService: AuthService, private http: Http) {
    this.order.items = [];
    this.cartSub.next([]);
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

  getOrderPromise() {
    return new Promise((resolve) => { resolve(this.order)});
  }
  getCart() {
    return this.cartSub;
  }
  getCartPromise() {
    return new Promise((resolve) => { resolve(this.order.items)});
  }
  getTotal() {
    return this.order.total;
  }

  getRates() {
    console.log(this.order.address);
    const data = {

      shipments: this.order.items.map((item) => {
        const parcel = new Parcel(item.product.packaging, item.product.weight);
        item.product.packaging.weight = +item.product.weight;
        return {
          parcel: parcel,
          toAddress: this.order.address
        }
      })
    };
    return this.http.post(this.shipmentCreateUrl, JSON.stringify(data),{headers: new Headers({'Content-Type': 'application/json'})}).map((res) => {
      const ships = res.json();
      const shipments = [];
      for (let i = 0; i < ships.length; i++) {
        this.order.items[i].shipment = new OrderShipment(ships.id);
        shipments.push({
          product: this.order.items[i].product,
          shipmentId: ships[i].id,
          rates: ships[i].rates
        })
      }
      return shipments;
    });
  }






}
