import {AdminService} from '../admin.service';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {LoadingService} from '../loading.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
@Injectable()
export class AdminResolve implements Resolve<Observable<string>> {
  routeObservable = new Subject<string>();
  constructor(private adminService: AdminService, private loadingService: LoadingService, private location: Location) {
  }
  resolve(route: ActivatedRouteSnapshot) {
    this.loadingService.setLoading(true);
    return this.adminService.getPermissions().then(() => {
      this.loadingService.setLoading(false);
      this.routeObservable.next(route.paramMap.get('page'));
      return this.routeObservable.asObservable();
    }).catch(() =>{
      this.loadingService.setLoading(false);
      this.location.back();
    });

  }
}

