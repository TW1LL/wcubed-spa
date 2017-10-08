import {AuthService} from '../auth.service';
import {Injectable} from '@angular/core';
import {Category} from '../../models';
import {Resolve} from '@angular/router';
import {LoadingService} from '../loading.service';
@Injectable()
export class UserResolve implements Resolve<Category[]> {
  constructor(private authService: AuthService, private loadingService: LoadingService) {

  }
  resolve() {
    this.loadingService.setLoading(true);
    const usr = this.authService.getUserPromise();
    return usr.then((user) => {
      this.loadingService.setLoading(false);
      return user;
    });
  }
}
