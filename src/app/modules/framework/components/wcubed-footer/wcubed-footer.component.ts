import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wcubed-footer',
  template: `
    <footer class="page-footer blue-grey darken-3">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">w3</h5>
            <p class="grey-text text-lighten-4">Materials for you.</p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
            <ul>
              <li><a class="grey-text text-lighten-3" routerLink="/home">Home</a></li>
              <li><a class="grey-text text-lighten-3" routerLink="/product">Products</a></li>
              <li><a class="grey-text text-lighten-3" routerLink="/about">About</a></li>
              <li><a class="grey-text text-lighten-3" routerLink="/news">News</a></li>
              <li><a class="grey-text text-lighten-3" routerLink="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
          © 2017 Copyright wcubed
          <a class="grey-text text-lighten-4 right" routerLink="/admin">Admin</a>
        </div>
      </div>
    </footer>

  `,
  styles: []
})
export class WcubedFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
