import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models';
import {ActivatedRoute, Resolve} from '@angular/router';
import {fadeInAnimation} from '../../../pipes/animations';

@Component({
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  selector: 'category-list',
  template: `
  <div class="row">
    <div class="col s12 m6 l4" *ngFor="let category of categories">
        <category-card [category] = category></category-card>
    </div>
  </div>
  `,
  styles: []
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  sub: any;
  @Input() count: number;
  errorMessage: any;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
      this.categories = this.route.snapshot.data['categories'];
      if(this.categories) {
        this.categories.slice(0, this.count || this.categories.length);
      }
  }
}

