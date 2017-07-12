import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class LoadingService {
  private loadingSub = new Subject<boolean>();
  setLoading(val: boolean) {
    this.loadingSub.next(val);

  }

  isLoading() {
    return this.loadingSub.asObservable();
  }
}
