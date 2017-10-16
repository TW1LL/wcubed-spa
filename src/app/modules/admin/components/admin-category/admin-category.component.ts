import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../models';
import {CategoryService} from '../../../cart/services/category.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'admin-category',
  template: `    
      <category-list *ngIf="!category" [categories]="categories"></category-list>
      <admin-category-details *ngIf="category" [category]="category"></admin-category-details>
  `,
  styles: []
})
export class AdminCategoryComponent implements OnInit {
  category: Category;
  categories: Category[];
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {

  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.categoryService.getCategory(params['id']).then(cat => {
          this.category = cat;
        });
      } else {
        this.category = null;
        this.categoryService.getCategories().then(cat => this.categories = cat);
      }
    })
  }

}
