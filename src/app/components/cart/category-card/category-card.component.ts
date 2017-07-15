import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../models';

@Component({
  selector: 'category-card',
  template: `
    <a routerLink="/product/cat/{{category.id}}">
      <mz-card>
          <mz-card-content>
            <div class="img-wrapper">
              <span class="card-title">{{category.name}}</span>
              <img src="assets/images/{{category.thumbnail}}" />
            </div>
            {{category.description}}
          </mz-card-content>
      </mz-card>
    </a>
  `,
  styles: [`a {
    color: rgba(0, 0, 0, 0.87);;
  }`, `.img-wrapper {
    overflow: hidden;
    max-height: 275px;
  }`]
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category;
  constructor() { }

  ngOnInit() {
  }

}
