import { Component, OnInit } from '@angular/core';
import {User} from "../../../models";
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from '../../../services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-account-page',
  template: `
        <div class="row">
            <div class="col m8 s12 right">
  
                <mz-card 
                    [backgroundClass]="'blue-grey darken-1'">
                    <mz-card-content>
                        <span class="card-title">{{ user.email}}'s information</span>
                        <div class="card-panel">
                        </div>
                    </mz-card-content>
                </mz-card>

            
                <div class="card blue-grey darken-1">
                    <div class="card-content">
                        <span class="card-title">Recent Orders</span>
                        <div class="row">
                            <!--<div class="col m6 s12" *ngFor="let order of user.orders">-->
                                <!--<div class="card-panel">-->
                                    <!--<a href="/order/{{order.id}}">-->
                                    <!--<img src="{{ order.image }}" class="responsive-img" />-->
                                    <!--<p>Total: $ {{order.total}}</p>-->
                                    <!--<p>Ordered {{order.created}}</p>-->
                                    <!--</a>-->
                                <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class=" col s12 m4 left">
                <div class="collection">
                    <a href="/cart" class="collection-item">View My Cart</a>
                    <a href="/account/password/change" class="collection-item">Change Password</a>
                    <a href="/account/change_info" class="collection-item">Update Information</a>
                    <a href="/order/history" class="collection-item">Order History</a>
                    <a href="/account/logout" class="collection-item">Logout</a>
                </div>
            </div>
          
        </div>
  `,
  styles: []
})

export class AccountPageComponent implements OnInit {
  page: string;
  user: User;


  constructor(private route: ActivatedRoute, private authService: AuthService, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.page = params['page'];
    })
    this.user = this.authService.getUser();
    this.authService.getUserObservable().subscribe((user) => {
      this.user = user;
      if (!this.user) {
        this.location.back();
      }
    });
  }

}
