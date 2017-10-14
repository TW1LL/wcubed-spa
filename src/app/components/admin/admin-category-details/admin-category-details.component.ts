import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../models';

@Component({
  selector: 'admin-category-details',
  template: `
    <mz-card>
      <mz-card-content>
        <a routerLink="/product/cat/{{category.id}}">
          <div class="img-wrapper">
            <span class="card-title">{{category.name}}</span>
            <img src="assets/images/{{category.thumbnail}}" width="100%" />
          </div>
          <p>
            {{category.description}}
          </p>
        </a>
        <button mz-button class="blue-grey darken-2" *ngIf="isAdmin" routerLink="/admin/category/{{category.id}}">Edit</button>
      </mz-card-content>
    </mz-card>
  `,
  styles: []
})
export class AdminCategoryDetailsComponent implements OnInit {
  @Input()
  category: Category;
  constructor() { }

  ngOnInit() {
  }

}
