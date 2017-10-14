
import {Product} from '../models';

import { Injectable }              from '@angular/core';
import {Http, Response}          from '@angular/http';
import {API} from '../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import {Category} from '../models';


@Injectable()
export class ProductService {
  private url = API.product;  // URL to web API
  private products: Product[];
  constructor (private http: Http) {
  }

  public getProducts(category: string = null): Promise<Product[]> {
    return new Promise((resolve) => {
      if(this.products) {
        return resolve(this.filter(category));
      } else {
        this.retrieveProducts().then((products) => {
          this.products = products;
          resolve(this.filter(category))
        })
      }

    })
  }

  public getProduct(id: number = 0): Promise<Product> {
    return new Promise((resolve) => {
      if (this.products) {
        resolve(this.products.find(product => product.id == id))
      } else {
        this.retrieveProducts().then((products) => {
          this.products = products;
          resolve(this.products.find(product => product.id == id));
        })
      }
    })
  }

  private filter(category: string) {
    return category ? this.products.filter(product => product.category.id ===  +category) : this.products;
  }

  private retrieveProducts(): Promise<Product[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData = (res: Response): Product[] => {
    const json: Product[] = res.json() || [];
    if (json.length > 0) {
      return json.map(prod => {
        prod.images = JSON.parse(prod.images);
        return prod;
      });
    }
    return json;
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
