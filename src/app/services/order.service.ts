import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Product, OrderItem, Order, Address, OrderShipment, Parcel, Payment} from '../models';
import {API} from '../constants/index';
import {Http, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {isEquivalent} from '../pipes/utils';
@Injectable()
export class OrderService {
  createUrl = API.orderCreate;
  shipmentCreateUrl = API.shipmentCreate;
  shipmentBuyUrl = API.shipmentBuy;
  private cartSub = new Subject<OrderItem[]>();
  private order: Order = new Order();
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
    this.order.total = this.getTotal();
    this.order.items = this.order.items.map((item) => { item.packaging = item.product.prodPackaging; return item; });
    console.log(this.order);
    if ((this.order.user != null || this.order.address.email != null )&&
        this.order.address != null &&
        this.order.payment != null &&
        this.order.items.length > 0
    ) {
      return this.http.post(this.createUrl, JSON.stringify(this.order),{headers: new Headers({'Content-Type': 'application/json'})}).map((order)  => {
        this.order.id = order.json().id;

        this.purchase();
      })
    }
  }

  createPayment(stripeToken: any) {
    this.order.payment = new Payment();
    this.order.payment.stripeToken = stripeToken.id;
  }

  getOrderPromise() {
    return new Promise((resolve) => { resolve(this.order)});
  }
  getCart() {
    return this.cartSub;
  }

  getRates() {
    const data = {

      shipments: this.order.items.map((item) => {
        const parcel = new Parcel(item.product.prodPackaging, item.product.weight);
        item.product.prodPackaging.weight = +item.product.weight;
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

  saveRates(orderShipments: OrderShipment[]) {
    console.log('saving rates', orderShipments);
    for (let i = 0; i < orderShipments.length; i++) {
      this.order.items[i].shipment = orderShipments[i];
    }
  }

  getTotal() {
    let total = 0;
    // Shipment price + product price
    this.order.items.forEach((item) => {
      total += +item.shipment.price;
      total += +item.product.price * item.quantity;
    });
    if (this.order.address && (this.order.address.state === 'NJ' || this.order.address.state === 'New Jersey')) {
      total += Math.round(total * 0.07 * 100) / 100;
    }

    return total;
  }

  purchase() {
    console.log(this.order);

  }



}
