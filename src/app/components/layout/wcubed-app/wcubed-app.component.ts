import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../../services/loading.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'wcubed-app',
  template: `
   
      <mz-progress [ngClass]="loading ? 'loading-show' : 'loading-hidden'"
        [backgroundClass]="'blue-grey lighten-3'"
        [progressClass]="'blue-grey'">
      </mz-progress>
      <main [ngClass]="loading ? 'loading-show' : 'loading-hidden'">
          <router-outlet></router-outlet>
      </main>
  `,
  styles: [],

})

export class WcubedAppComponent implements OnInit, OnDestroy {
  sub: any;
  loading: boolean = true;
  constructor(private loadingService: LoadingService, private authService: AuthService) { }

  ngOnInit() {
    this.subscribe();

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  subscribe() {
    this.sub = this.loadingService.isLoading().subscribe(loading => {
      this.loading = loading;
    })
  }

}
