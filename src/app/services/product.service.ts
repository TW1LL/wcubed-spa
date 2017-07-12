
import {Product} from '../models';

import { Injectable }              from '@angular/core';
import {Http, Response}          from '@angular/http';
import {API} from '../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProductService {
  private url = API.product;  // URL to web API
  private products: Product[];
  private productSub = new Subject<Product[]>();
  constructor (private http: Http) {
    this.retrieveProducts().then((products) => this.productSub.next(products))
  }

  public getProducts(): Observable<Product[]> {
    return this.productSub.asObservable();
  }


  private retrieveProducts(): Promise<Product[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData = (res: Response): Product[] => {
    this.products = res.json() || [];
    return this.products;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
