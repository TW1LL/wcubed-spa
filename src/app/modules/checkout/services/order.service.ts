import {Injectable} from '@angular/core';
import {UserService} from '../../account/services/user.service';
import {Product, OrderItem, Order, Address, OrderShipment, Parcel, Payment} from '../../../models';
import {API} from '../../../constants/index';
import {Http, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {isEquivalent} from '../../../pipes/utils';
@Injectable()
export class OrderService {
  createUrl = API.orderCreate;
  shipmentCreateUrl = API.shipmentCreate;
  shipmentBuyUrl = API.shipmentBuy;
  purchaseUrl = API.purchase;
  finalizeUrl = API.finalize;
  private cartSub = new Subject<OrderItem[]>();
  private order: Order = new Order();
  private rates: any;
  status: any;
  constructor(private userService: UserService, private http: Http) {
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
    this.status = 'created';
  }

  removeFromCart(item: OrderItem) {
    this.order.items.splice(item.id, 1);
    this.cartSub.next(this.order.items);
  }

  addAddress(address: Address) {
    this.order.address = address;
    this.status = 'address';
  }

  createPayment(stripeToken: any) {
    this.order.payment = new Payment();
    this.order.payment.stripeToken = stripeToken.id;
    this.order.payment.currency = 'usd';
  }

  getOrderPromise() {
    return new Promise((resolve) => { resolve(this.order)});
  }
  getCart() {
    return this.cartSub;
  }

  getRates() {
    const shipments = this.order.items.map((item) => {
        const parcel = new Parcel(item.product.prodPackaging, item.product.weight);
        item.product.prodPackaging.weight = +item.product.weight;
        return {
          parcel: parcel,
          toAddress: this.order.address
        }
      });

    return this.http.post(this.shipmentCreateUrl, JSON.stringify({shipments: shipments}),{headers: new Headers(this.headers)}).map((res) => {
      const ships = res.json();
      const shipments = [];
      for (let i = 0; i < ships.length; i++) {
        this.order.items[i].shipment = new OrderShipment(ships[i].id);
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
    this.order.items = this.order.items.map((item) => {
      item.shipment = orderShipments.find((ship) => ship.shipmentId == item.shipment.shipmentId);
      return item;
    });

  }

  getTotal() {
    let total = 0;
    this.order.items.forEach((item) => {
      total += +item.shipment.price;
      total += +item.product.price * item.quantity;
    });
    if (this.order.address && (this.order.address.state === 'NJ' || this.order.address.state === 'New Jersey')) {
      total += Math.round(total * 0.07 * 100) / 100;
    }

    return total;
  }

  finalize() {
    const finalizeSub = new Subject<string>();
    this.saveOrder(finalizeSub)
      .then(this.purchaseOrder)
      .then(this.buyShipment)
      .then(this.finalizeOrder)
      .then((sub) => {
        this.status = 'finalized';
        sub.next(this.status);
      }).catch((err) => {
        finalizeSub.next(err.message);
        console.log(err);
      });
    return finalizeSub;

  }

  saveOrder = (finalizeSub: Subject<string>) => {
    if (this.userService.isLoggedIn()) {
      this.order.user = this.userService.getUser();
      this.order.address.email = this.order.user.email;
    }
    if ((this.order.user != null || this.order.address.email != null )&&
      this.order.address != null &&
      this.order.payment != null &&
      this.order.items.length > 0
    ) {
      this.order.total = this.getTotal();
      this.order.items = this.order.items.map((item) => { item.packaging = item.product.prodPackaging; return item; });
      this.status = 'confirm';
      finalizeSub.next(this.status);
      return this.http.post(this.createUrl, JSON.stringify(this.order),{headers: new Headers(this.headers)}).toPromise().then((order)  => {
        this.order = order.json();

        return finalizeSub;
      });
    } else {
      return new Promise((res, reject) => {
        reject({message:'Order not complete'});
      })
    }

  }

  buyShipment = (finalizeSub: Subject<string>) => {
    this.status = 'shipping';
    finalizeSub.next(this.status);
    const shipments: OrderShipment[] = this.order.items.map((item) => {
      return item.shipment;
    });
    return this.http.post(this.shipmentBuyUrl, JSON.stringify({orderId: this.order.id, shipments: shipments}),{headers: new Headers(this.headers)}).toPromise().then((res) => {
      this.order = res.json();
      return finalizeSub;
    });

  }

  purchaseOrder = (finalizeSub: Subject<string>) => {
    this.status = 'paying';
    finalizeSub.next(this.status);
    return this.http.post(this.purchaseUrl, JSON.stringify({orderId: this.order.id}),{headers:new Headers(this.headers)}).toPromise().then((res) => {
      this.order = res.json();
      return finalizeSub;
    })
  }

  finalizeOrder = (finalizeSub: Subject<string>) => {
    this.status = 'finalizing';
    finalizeSub.next(this.status);
    return this.http.post(this.finalizeUrl, JSON.stringify({orderId: this.order.id}), {headers: new Headers(this.headers)}).toPromise().then((res) => {
      this.order = res.json();
      return finalizeSub;
    })
  }

  get headers() {
    return  this.userService.isLoggedIn() ? {'Content-Type': 'application/json', 'token': this.userService.getToken()} : {'Content-Type': 'application/json'};
  }


}

