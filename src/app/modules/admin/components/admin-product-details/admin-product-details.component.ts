import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../cart/services/product.service';
import {Product} from '../../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../cart/services/category.service';
import {Category} from '../../../../models';
import {Package} from '../../../../../../../wcubed-api/src/models';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'admin-product-details',
  template: `
    <mz-card>
      <mz-card-content>
        <form [formGroup]="productForm">
          <div class="row">
            <div class="col s6 m8">
              <div class="row">
                <mz-input-container class="col s6 m4">
                  <input mz-input mz-validation required
                         id="input-name"
                         formControlName="name"
                         type="text"
                         [errorMessageResource]="errorMessages.name"
                         [label]="'Product Name'">
                </mz-input-container>
                <mz-input-container class="col s6 m4">
                    <select required mz-select id="select-category" [label]="'Category'" formControlName="category">
                      <option *ngFor="let category of categories" [ngValue]="category">{{category.name}}</option>
                    </select>
                </mz-input-container>
                <mz-input-container class="col s6 m4">
                  <select required mz-select id="select-packaging" [label]="'Packaging'" formControlName="prodPackaging">
                    <option *ngFor="let package of packaging" [ngValue]="package">{{package.name || package.predefined_package}}</option>
                  </select>
                </mz-input-container>
              </div>
              <div>
                <mz-textarea-container>
                  <textarea mz-textarea required
                            [label]="'Description'"
                            id="textarea-desc"
                            formControlName="description"
                            length="500"></textarea>
                </mz-textarea-container>
              </div>
              <div class="row">
                <mz-input-container class="col s8">
                  <select required mz-select id="select-category" [label]="'Thumbnail'" formControlName="thumbnail">
                    <option *ngFor="let image of product.images" [ngValue]="image">{{image}}</option>
                  </select>
                </mz-input-container>
                <img src="assets/images/{{productForm.value.thumbnail}}" width="100%" class="col s4" />

              </div>
            </div>
            <div class="col s6 m4">
              <div class="row">
                <mz-checkbox-container class="col s6">
                  <input mz-checkbox
                         id="input-digital"
                         formControlName="digital"
                         [label]="'Digital'"
                         [filledIn]="true"
                         type="checkbox"
                  >
                </mz-checkbox-container>
                <mz-checkbox-container class="col s6">
                  <input mz-checkbox
                         id="input-hidden"
                         formControlName="hidden"
                         [label]="'Hidden'"
                         [filledIn]="true"
                         type="checkbox"
                  >
                </mz-checkbox-container>
              </div>
              <mz-input-container>
                <input mz-input mz-validation required
                     id="input-price"
                     formControlName="price"
                     type="number"
                     [errorMessageResource]="errorMessages.price"
                     [label]="'Price'">
              </mz-input-container>
              <mz-input-container *ngIf="!this.productForm.value.digital">
                <input mz-input mz-validation required
                       id="input-weight"
                       formControlName="weight"
                       type="number"
                       [errorMessageResource]="errorMessages.weight"
                       [label]="'Weight'">
              </mz-input-container>
              <mz-input-container *ngIf="!this.productForm.value.digital">
                <input mz-input mz-validation required
                       id="input-onHand"
                       formControlName="onHand"
                       type="number"
                       [errorMessageResource]="errorMessages.onHand"
                       [label]="'On Hand'">
              </mz-input-container>
            </div>
          </div>
         
        </form>
      </mz-card-content>
      <mz-card-action>
        <button mz-button [disabled]="!productForm.valid" (click)="onSubmit()">Submit</button>
      </mz-card-action>
    </mz-card>
  `,
  styles: []
})
export class AdminProductDetailsComponent implements OnInit {
  @Input()
  product: Product;
  productForm: FormGroup;
  categories: Category[];
  packaging: Package[];
  errorMessages = {
    name: {
      required: 'A Product Name is required.'
    },
    price: {
      required: 'A Price is required.',
      min: 'Price must be greater than $0'
    },
    weight: {
      required: 'A Weight is required.',
      min: 'Weight must be greater than 0'
    },
    onHand: {
      required: 'On Hand must have a quantity',
      min: 'You cannot have negative stock'
    }

  }
  constructor(private productService: ProductService,
              private adminService: AdminService,
              private categoryService: CategoryService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
    Promise.all([this.categoryService.getCategories(), this.productService.getPackaging()]).then(([categories, packaging]) => {
      this.categories= categories;
      this.packaging = packaging;
    })

  }

  createForm() {
    this.productForm = this.fb.group({
      name: [this.product.name, Validators.required],
      category: [this.product.category, Validators.required],
      price: [this.product.price, Validators.compose([Validators.required, Validators.min(1)])],
      weight: [this.product.weight, Validators.compose([Validators.required, Validators.min(0)])],
      prodPackaging: [this.product.prodPackaging, Validators.required],
      description: [this.product.description, Validators.compose([Validators.required, Validators.minLength(10)])],
      digital: [this.product.digital],
      onHand:[this.product.onHand, Validators.compose([Validators.required, Validators.min(0)])],
      hidden:[this.product.hidden],
      thumbnail:[this.product.thumbnail, Validators.required]
    })
  }

  onSubmit() {
    const formModel = this.productForm.value;

    const copy = Object.assign(this.product, formModel);
    copy.images = JSON.stringify(copy.images);
    this.adminService.update('product', copy).then(() => {
      this.router.navigate(['admin/product'])
    })
  }

}
