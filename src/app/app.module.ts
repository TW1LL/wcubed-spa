import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductService} from './services/product.service';
import {HttpModule} from '@angular/http';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {MaterializeModule} from 'ng2-materialize';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterializeModule.forRoot()
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
