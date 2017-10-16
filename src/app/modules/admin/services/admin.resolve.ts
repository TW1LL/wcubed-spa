import {AdminService} from './admin.service';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {LoadingService} from '../../framework/services/loading.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
@Injectable()
export class AdminResolve implements Resolve<boolean> {
  routeObservable = new Subject<string>();
  constructor(private adminService: AdminService, private loadingService: LoadingService, private router: Router) {
  }
  resolve(route: ActivatedRouteSnapshot) {
    this.loadingService.setLoading(true);
    return this.adminService.getPermissions().then(() => {
      this.loadingService.setLoading(false);
      return true;
    }).catch(() =>{
      this.loadingService.setLoading(false);
      this.router.navigate(['home']);
    });

  }
}

