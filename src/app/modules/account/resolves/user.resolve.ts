import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {Category} from '../../../models';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {LoadingService} from '../../framework/services/loading.service';
import {Location} from '@angular/common';
import {User} from '../../../../../../wcubed-api/src/models/account/user';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class UserResolve implements Resolve<boolean> {
  routeObservable = new Subject<string>();
  constructor(private userService: UserService, private loadingService: LoadingService, private router: Router) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    this.loadingService.setLoading(true);
    return this.userService.getUserPromise().then(() => {
      this.loadingService.setLoading(false);
      return true;
    }).catch(() =>{
      this.loadingService.setLoading(false);
      this.router.navigate(['home']);
    });

  }
}
