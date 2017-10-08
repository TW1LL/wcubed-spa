import {Http, Headers, Response} from '@angular/http';
import {API} from '../constants/index';
import {rankTitle} from '../models';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AdminService {
    private permissions: boolean;

    constructor(private http: Http, private authService: AuthService) {}

    getPermissions(): Promise<any> {
      return new Promise((resolve) => {
        if (this.permissions != null) {
          resolve(this.permissions);
        } else {
          return this.retrievePermissions().then(permissions => {
            this.permissions = permissions;
            resolve(permissions);
          })
        }
      })
     }

    retrievePermissions() {
      return this.http.post(API.checkRank, {checkRank: rankTitle.Admin}, {headers: new Headers(this.headers)})
        .toPromise().then(this.extractData);
    }

  private extractData = (res: Response): boolean => {
    return res.json() || [];
  }

  get headers() {
    return  this.authService.isLoggedIn() ?
      {'Content-Type': 'application/json', 'token': this.authService.getToken()} :
      {'Content-Type': 'application/json'};
  }
}
