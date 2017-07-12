import {CategoryService} from './category.service';
import {Injectable} from '@angular/core';
import {Category} from '../models';
import {Resolve} from '@angular/router';
@Injectable()
export class CategoryListResolve implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService) {

  }
  resolve() {
    const cats = this.categoryService.getCategories();
    return cats.then((categories) => categories);
  }
}
