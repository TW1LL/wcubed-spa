
import {Category} from '../../../models';

import { Injectable }              from '@angular/core';
import {Http, Response}          from '@angular/http';
import {API} from '../../../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';


@Injectable()
export class CategoryService {
  private url = API.category;
  private categories: Category[];
  constructor (private http: Http) {
  }

  public getCategories(ignoreCache = false): Promise<Category[]> {
      return new Promise((resolve) => {
        if(!ignoreCache && this.categories) {
          return resolve(this.categories);
        } else {
          return this.retrieveCategories().then((categories: Category[]) => {
          this.categories = categories;
          resolve(categories);
          })
        }
      })

  }
  public getCategory(id: number = 0): Promise<Category> {
    return new Promise((resolve) => {
      if(this.categories) {
        resolve(this.categories.find(cat => cat.id == id));
      } else {
        this.retrieveCategories().then((categories: Category[]) => {
          console.log(categories);
          this.categories = categories;
          resolve(this.categories.find(cat => cat.id == id)) })
      }
    })

  }

  private retrieveCategories() {
    return this.http.get(this.url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData = (res: Response): Category[] => {
    return res.json() || [];
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
