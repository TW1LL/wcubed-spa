import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-account-dropdown',
  template: `
    <mz-dropdown
      [id]="'dropdown'"
      [align]="'left'"
      [belowOrigin]="true"
      [constrainWidth]="true"
      [dropdownButtonId]="'btn-dropdown'"
      [gutter]="true"
      [hover]="false"
      [inDuration]="300"
      [outDuration]="300"
      [stopPropagation]="true"
    >
      <mz-dropdown-item><a href="#">Register</a></mz-dropdown-item>
      <mz-dropdown-item><a href="#">Login</a></mz-dropdown-item>
    </mz-dropdown>
    <mz-navbar-item><a id="btn-dropdown" href="#">User <i mz-icon-mdi [align]="'right'" [icon]="'arrow-down-drop-circle-outline'"></i> </a></mz-navbar-item>
  `,
  styles: []
})
export class AccountDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
