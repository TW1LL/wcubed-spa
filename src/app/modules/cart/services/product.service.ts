
import {Product} from '../../../models';

import { Injectable }              from '@angular/core';
import {Http, Response}          from '@angular/http';
import {API} from '../../../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Package} from '../../../../../../wcubed-api/src/models';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';


@Injectable()
export class ProductService {
  private url = API.product;  // URL to web API
  private packageUrl = API.packaging;
  private products: Product[];
  private packaging: Package[];
  constructor (private http: Http) {
  }

  public getProducts(category: string = null, ignoreCache = false): Promise<Product[]> {
    return new Promise((resolve) => {
      if(!ignoreCache && this.products) {
        return resolve(this.filter(category));
      } else {
        this.retrieveProducts().then((products: Product[]) => {
          this.products = products;
          resolve(this.filter(category))
        }).catch();
      }

    })
  }

  public getProduct(id: number = 0): Promise<Product> {
    return new Promise((resolve) => {
      if (this.products) {
        resolve(this.products.find(product => product.id == id))
      } else {
        this.retrieveProducts().then((products: Product[]) => {
          this.products = products;
          resolve(this.products.find(product => product.id == id));
        }).catch();
      }
    })
  }

  public getPackaging(): Promise<Package[]> {
    return new Promise((resolve) => {
      if (this.packaging) {
        resolve(this.packaging)
      } else {
        this.retrievePackaging().then((packaging) => {
          this.packaging = packaging;
          resolve(this.packaging);
        })
      }
    })
  }

  public updateProductQuantity(product: Product, diff: number) {
    this.products = this.products.map((prod) => {
      if (prod.id === product.id) {
        prod.onHand = prod.onHand - diff;
      }
      return prod;
    })
  }

  private filter(category: string) {
    return category ? this.products.filter(product => product.category.id ===  +category) : this.products;
  }

  private retrieveProducts(): Promise<Product[] | ErrorObservable> {
    return this.http.get(this.url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private retrievePackaging(): Promise<Package[]> {
    return this.http.get(this.packageUrl)
      .toPromise()
      .then((res) => res.json())
      .catch(this.handleError)
  }

  private extractData = (res: Response): Product[] => {
    const json = res.json() || [];
    if (json.length > 0) {
      return json.map(prod => {
        prod.images = JSON.parse(prod.images);
        prod.digital = prod.digital == 'true'
        prod.hidden = prod.hidden == 'true'
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
