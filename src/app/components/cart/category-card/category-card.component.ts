import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../models';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'category-card',
  template: `
    
      <mz-card>
          <mz-card-content>
            <a routerLink="/product/cat/{{category.id}}">
            <div class="img-wrapper">
              <span class="card-title">{{category.name}}</span>
              <img src="assets/images/{{category.thumbnail}}" />
            </div>
            <p>
                {{category.description}}
            </p>
            </a>
            <button mz-button class="blue-grey darken-2" *ngIf="isAdmin" routerLink="/admin/category/{{category.id}}">Edit</button>
          </mz-card-content>
      </mz-card>

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
  isAdmin: boolean;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getPermissions().then(() => this.isAdmin = true).catch(() => this.isAdmin = false);
  }

}
