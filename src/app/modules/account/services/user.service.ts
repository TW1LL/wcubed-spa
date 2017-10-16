
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {User} from '../../../models';
import {Http} from '@angular/http';
import {API} from '../../../constants/index';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class UserService {
  loginUrl: string = API.userLogin;
  registerUrl: string = API.userRegister;
  private user: User;
  private token: string;
  private userObserve = new Subject<User>();
  constructor(private http: Http) {
    const current = localStorage.getItem('current') ? JSON.parse(localStorage.getItem('current')) : false;
    if (current && current.user) {
      this.user = current.user;
      this.token = current.token;
    }
  }

  login(user: any) {
     return this.http.post(this.loginUrl, JSON.stringify(user), {headers: new Headers({'Content-Type': 'application/json'})}).map((res) => {
        const data = res.json();
        if (data.result) {
          this.updateCurrent(data);
        }
        return data;
      });
  }

  register(user) {
    return this.http.post(this.registerUrl, JSON.stringify(user), {headers: new Headers({'Content-Type': 'application/json'})}).map((res) => {
      const data = res.json();
      if (data.result) {
        this.updateCurrent(data);
      }
      return data;
    });
  }
  logout() {
    this.user = null;
    this.token = null;
    this.userObserve.next(null);
    this.clearUser();
  }
  isLoggedIn() {
    return !!this.user;
  }

  getUserPromise(){
    return new Promise((resolve, reject) => {
      if (this.user) {
        resolve(this.user);
      }
        reject();
    });
  }

  getUserObservable() {
    return this.userObserve.asObservable();
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }
  saveResult(current) {
    localStorage.setItem('current', JSON.stringify(current));
  }
  clearUser() {
    localStorage.setItem('current', '');
  }
  updateCurrent(current) {
    this.user = current.user;
    this.token = current.token;
    this.saveResult(current);
    this.userObserve.next(current.user);
  }

}
