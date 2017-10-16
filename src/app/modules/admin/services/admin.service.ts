import {Http, Headers, Response} from '@angular/http';
import {API} from '../../../constants/index';
import {rankTitle} from '../../../models';
import {UserService} from '../../account/services/user.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ProductService} from '../../cart/services/product.service';
import {CategoryService} from '../../cart/services/category.service';

@Injectable()
export class AdminService {
  private permissions: boolean = null;

  constructor(private http: Http,
              private userService: UserService,
              private productService: ProductService,
              private categoryService: CategoryService) {
    this.userService.getUserObservable().subscribe(user => {
      this.getPermissions(true).catch();
    })

  }

  getPermissions(ignoreCache: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!ignoreCache && this.permissions != null) {
        if (this.permissions) {
          resolve(this.permissions);
        } else {
          reject(this.permissions);
        }

      } else {
        this.retrievePermissions().then(permissions => {
          this.permissions = permissions.result;
          if (this.permissions) {
            resolve(this.permissions);
          } else {
            reject(this.permissions);
          }
        }).catch(() => {
          reject(false);
        });
      }
    })
  }

  retrievePermissions() {
    return this.http.post(API.checkRank, {checkRank: rankTitle.Admin}, {headers: new Headers(this.headers)})
      .toPromise().then(this.extractData).catch(this.extractData);
  }

  private extractData = (res: Response, type: string =null): any => {
    switch(type) {
      case 'product':
        this.productService.getProducts(null, true);
        break;
      case 'category':
        this.categoryService.getCategories(true);
        break;
    }
    return res.json() || false;
  }

  get headers() {
    return  this.userService.isLoggedIn() ?
      {'Content-Type': 'application/json', 'token': this.userService.getToken()} :
      {'Content-Type': 'application/json'};
  }


  update(type, body) {
    let url = API[type];
    if (url) {
      return this.http.patch(url, body, {headers: new Headers(this.headers)}).toPromise().then((res) =>this.extractData(res, type));
    }
  }

  create(type, body) {
    let url = API[type];
    if (url) {
      return this.http.post(url, body, {headers: new Headers(this.headers)}).toPromise().then(this.extractData);
    }
  }

  delete(type, id) {
    let url = API[type] + '/' + id;
    if (url) {
      return this.http.delete(url, {headers: new Headers(this.headers)}).toPromise().then(this.extractData);
    }
  }




}
