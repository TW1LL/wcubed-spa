import {AuthService} from '../auth.service';
import {Injectable} from '@angular/core';
import {Category} from '../../models';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {LoadingService} from '../loading.service';
import {Location} from '@angular/common';
import {User} from '../../../../../wcubed-api/src/models/account/user';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class UserResolve implements Resolve<Observable<string>> {
  routeObservable = new Subject<string>();
  constructor(private authService: AuthService, private loadingService: LoadingService, private location: Location) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    this.loadingService.setLoading(true);
    return this.authService.getUserPromise().then(() => {
      this.loadingService.setLoading(false);
      this.routeObservable.next(route.paramMap.get('page'));
      return this.routeObservable.asObservable();
    }).catch(() =>{
      this.loadingService.setLoading(false);
      this.location.back();
    });

  }
}
