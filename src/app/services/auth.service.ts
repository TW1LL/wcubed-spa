
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {User} from '../models';
import {Http} from '@angular/http';
import {API} from '../constants/index';


@Injectable()
export class AuthService {
  loginUrl: string = API.userLogin;
  registerUrl: string = API.userRegister;
  private user: User;
  private token: string;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  login(user: any) {
     return this.http.post(this.loginUrl, JSON.stringify(user), {headers: new Headers({'Content-Type': 'application/json'})}).map((res) => {
        const data = res.json();
        if (!data.result) {
          return false;
        } else {
          this.token = data.token;
          this.user = data.user;
          return true;
        }
      });
  }

  register(user) {
    return this.http.post(this.registerUrl, JSON.stringify(user), {headers: new Headers({'Content-Type': 'application/json'})}).map((res) => {
      const data = res.json();
      if (!data.result) {
        return false;
      } else {
        this.token = data.token;
        this.user = data.user;
        return true;
      }
    });
  }
  logout() {
    this.user = null;
    this.token = null;
  }
  isLoggedIn() {
    return this.user != null;
  }

  getUser() {
    return this.user;
  }
  updateUser(user: User) {
    this.user = user;
  }
}
