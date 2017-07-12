import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../../services/loading.service';
import {fadeInAnimation, fadeOutAnimation} from '../../../pipes/animations';

@Component({
  selector: 'loading-wrapper',
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
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  sub: any;
  loading: boolean = true;
  constructor(private loadingService: LoadingService) { }

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
