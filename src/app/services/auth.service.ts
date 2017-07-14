
import {Injectable} from '@angular/core';
import {User} from '../models';
import {Http} from '@angular/http';
import {API} from '../constants/index';


@Injectable()
export class AuthService {
  url: string = API.user;
  private user: User;
  private token: string;
  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  login(user: any) {
    return this.http.get(this.url+'/login').map((res) => {
      const data = res.json();
      if (!data.result) {
        return false;
      } else {
        this.token = data.token;
        this.user = data.user;
      }
    })
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
