import {CategoryService} from './category.service';
import {Injectable} from '@angular/core';
import {Category} from '../models';
import {Resolve} from '@angular/router';
import {LoadingService} from './loading.service';
@Injectable()
export class CategoryListResolve implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService, private loadingService: LoadingService) {

  }
  resolve() {
    this.loadingService.setLoading(true);
    const cats = this.categoryService.getCategories();
    return cats.then((categories) => {
      this.loadingService.setLoading(false);
      return categories;
    });
  }
}
