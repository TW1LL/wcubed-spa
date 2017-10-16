import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {TruncatePipe} from './pipes/truncate';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CurrencyPipe} from '@angular/common';

import {FrameworkModule} from './modules/framework/framework.module';




@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    FrameworkModule
  ],
  providers: [
    CurrencyPipe
  ],
  declarations: [
    AppComponent,
    TruncatePipe,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
