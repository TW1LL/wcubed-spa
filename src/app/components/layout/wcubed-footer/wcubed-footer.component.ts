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
              <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
          © 2017 Copyright wcubed
          <a class="grey-text text-lighten-4 right" href="#!">Admin</a>
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
