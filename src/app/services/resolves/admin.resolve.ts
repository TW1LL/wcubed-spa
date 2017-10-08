import {AdminService} from '../admin.service';
import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {LoadingService} from '../loading.service';
@Injectable()
export class AdminResolve implements Resolve<boolean> {
  constructor(private adminService: AdminService, private loadingService: LoadingService) {

  }
  resolve() {
    this.loadingService.setLoading(true);
    const cats = this.adminService.getPermissions();
    return cats.then((perm) => {
      this.loadingService.setLoading(false);
      return perm.result;
    });
  }
}
